# Code Review: orderController.js

Reviewed: 2026-04-26
Files: `backend/controllers/orderController.js`, `backend/routes/orderRoute.js`, `backend/middleware/auth.js`, `backend/middleware/adminAuth.js`, `backend/models/orderModel.js`

---

## [CRITICAL] verifyOrder endpoint allows client-controlled payment confirmation (payment bypass)

**File:** `backend/controllers/orderController.js:141-154` / `backend/routes/orderRoute.js:11`

**Issue:** The `/api/order/verify` route is completely unauthenticated (`orderRouter.post("/verify", verifyOrder)` — no middleware). It accepts `{ orderId, success }` directly from the request body and calls `orderModel.findByIdAndUpdate(orderId, { payment: true })` when `success === "true"`. Any anonymous caller can POST `{ orderId: "<any valid order id>", success: "true" }` and mark any order as paid without ever going through Easebuzz. The `easebuzzCallback` route already handles the legitimate server-to-server confirmation from Easebuzz, so `verifyOrder` is a redundant and dangerous endpoint.

**Fix:** Delete the `verifyOrder` function and its route entirely. All payment confirmation must flow through `easebuzzCallback`, which verifies the Easebuzz SHA-512 response hash before marking an order paid. If a frontend status-check endpoint is genuinely needed, make it read-only (return the current `payment` field from the DB — do not mutate it).

```js
// DELETE from orderRoute.js:
// orderRouter.post("/verify", verifyOrder);

// DELETE from orderController.js:
// const verifyOrder = async (req, res) => { ... };
```

---

## [CRITICAL] /api/order/status (updateStatus) has no authentication — any caller can change any order status

**File:** `backend/routes/orderRoute.js:10`

**Issue:** `orderRouter.post("/status", updateStatus)` has no middleware. The `updateStatus` handler accepts `req.body.orderId` and `req.body.status` and blindly writes to the DB. Any unauthenticated user on the internet can flip any order to "Delivered", "Cancelled", etc.

**Fix:** Protect the route with `adminAuth` (already exists in the codebase):

```js
import adminAuth from '../middleware/adminAuth.js';

// Before:
orderRouter.post("/status", updateStatus);

// After:
orderRouter.post("/status", adminAuth, updateStatus);
```

---

## [CRITICAL] /api/order/list exposes all orders to unauthenticated callers

**File:** `backend/routes/orderRoute.js:7`

**Issue:** `orderRouter.get("/list", listOrders)` has no middleware. The handler returns every order in the database (`orderModel.find({})`), including user addresses, phone numbers, and payment status. Any anonymous request to `GET /api/order/list` leaks all PII.

**Fix:**

```js
// Before:
orderRouter.get("/list", listOrders);

// After:
orderRouter.get("/list", adminAuth, listOrders);
```

---

## [CRITICAL] Easebuzz response hash string is built in wrong field order — hash verification is broken

**File:** `backend/controllers/orderController.js:17-19`

**Issue:** The Easebuzz reverse-hash formula documented by Easebuzz is:

```
sha512( SALT | status | udf5 | udf4 | udf3 | udf2 | udf1 | email | firstname | productinfo | amount | txnid | key )
```

The current `verifyResponseHash` builds:

```js
const str = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
```

That is 11 pipe-separated empty fields between `status` and `email`. The correct formula has 5 UDF fields, making only 4 separators (5 empty segments). The code has 11 `|` characters after `status`, producing 10 empty segments — 5 too many. If the computed hash is always wrong, the `computedHash === hash` check on line 81 always fails, meaning every legitimate payment is treated as failed and the order is deleted. Conversely, if Easebuzz ever changes its callback to omit the hash field (sending an empty string), `hash` would be `undefined`, `computedHash` would never equal `undefined`, so a failed payment still could not be falsely accepted — but the root bug is that real successful payments are silently deleted.

**Fix:** Confirm against your Easebuzz dashboard which UDF fields you are using. The standard (no UDFs) formula is:

```js
const verifyResponseHash = ({ salt, status, email, firstname, productinfo, amount, txnid, key }) => {
    // 5 UDF fields (all empty), then email, firstname, productinfo, amount, txnid, key
    const str = `${salt}|${status}|||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    return crypto.createHash('sha512').update(str).digest('hex');
};
```

Similarly verify `generateHash` (line 13) uses the correct forward formula (10 empty UDF fields between `email` and `salt` per the Easebuzz docs for initiation). The current string has `||||||||||` which is 10 pipes — that looks correct for the initiation direction if 10 UDF slots are defined; cross-check with Easebuzz documentation for your account tier.

---

## [CRITICAL] Hash comparison uses `===` (string equality) instead of a timing-safe comparison — timing side-channel

**File:** `backend/controllers/orderController.js:81`

**Issue:** `if (computedHash === hash && status === 'success')` compares two hex strings with JavaScript's `===`. String equality short-circuits on the first differing byte and leaks timing information. An attacker making many requests could potentially distinguish "almost correct" hashes from completely wrong ones.

**Fix:** Use `crypto.timingSafeEqual`:

```js
const safeCompare = (a, b) => {
    const bufA = Buffer.from(a, 'hex');
    const bufB = Buffer.from(b, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
};

if (safeCompare(computedHash, hash) && status === 'success') {
```

---

## [HIGH] placeOrder and placeOrderCod trust client-supplied `amount` — amount tampering possible

**File:** `backend/controllers/orderController.js:26-35`, `94-109`

**Issue:** `req.body.amount` is written directly to the database and used as the Easebuzz payment amount without server-side recalculation. A client can send `amount: 1` for a $200 cart. The server never verifies that `amount === sum(items[i].price * items[i].quantity) + deliveryCharge`. The `deliveryCharge` constant is defined on line 5 but never used in any calculation.

**Fix:** Fetch each item's price from the database and compute the authoritative amount server-side:

```js
// Pseudocode — adapt to your food item model
const itemIds = req.body.items.map(i => i._id);
const dbItems = await foodModel.find({ _id: { $in: itemIds } });
const priceMap = Object.fromEntries(dbItems.map(i => [i._id.toString(), i.price]));
const computedAmount = req.body.items.reduce((sum, i) => {
    return sum + (priceMap[i._id.toString()] ?? 0) * i.quantity;
}, deliveryCharge);
// Use computedAmount, not req.body.amount
```

---

## [HIGH] Order is persisted before payment gateway response — failed/abandoned payments leave orphan orders in the DB

**File:** `backend/controllers/orderController.js:25-31`

**Issue:** `placeOrder` saves the order to MongoDB and clears the user's cart before the user ever reaches the payment page. If the user closes the browser tab, the gateway times out, or the network drops, the order record remains with `payment: false` indefinitely and the cart is already gone. `easebuzzCallback` only deletes the order on an explicit failed callback — it never runs for abandoned sessions.

**Fix (options):**
1. Do not persist the order until `easebuzzCallback` confirms success. Store pending order details in a short-lived cache (Redis, or a `pendingOrders` collection with a TTL index) keyed by `txnid`.
2. Keep the current approach but add a background job (e.g., a cron that runs every hour) to delete `payment: false` orders older than N minutes, and do not clear the cart until payment is confirmed.

---

## [HIGH] `verifyResponseHash` uses request-supplied `status` in the hash string — status tampering vector

**File:** `backend/controllers/orderController.js:17-19`, `70-81`

**Issue:** The `status` field in the hash verification comes directly from `req.body` (line 68). This is correct per the Easebuzz design — `status` must be included in the hash so any tampering invalidates it. However, the check on line 81 evaluates `status === 'success'` only after verifying the hash. If `hash` in the response is missing or `undefined`, `computedHash` (a 128-char hex string) will never equal `undefined`, so the condition on line 81 is already safe against a missing hash. The real risk: if Easebuzz ever omits `hash` from its response body (e.g., due to a network error or misconfiguration), `hash` is `undefined`, the equality check fails, the order is deleted, and there is no differentiation between "payment genuinely failed" and "callback was malformed." Add an explicit guard.

**Fix:**

```js
const { status, txnid, amount, productinfo, firstname, email, hash } = req.body;

if (!hash || !txnid || !status) {
    console.error('Malformed Easebuzz callback — missing required fields', req.body);
    return res.redirect(`${frontend_URL}/verify?success=false&orderId=${txnid ?? 'unknown'}`);
}
```

---

## [HIGH] `placeOrderCod` has no server-side restriction — any authenticated user can place a COD order regardless of business rules

**File:** `backend/controllers/orderController.js:94-110` / `backend/routes/orderRoute.js:12`

**Issue:** Cash-on-delivery is offered to all authenticated users with no amount cap, no address validation, and no check that COD is enabled in config. If COD is meant to be restricted (e.g., only for certain regions or below a maximum order value), none of that logic exists.

**Fix:** At minimum, add a configurable `COD_ENABLED` environment flag and an `COD_MAX_AMOUNT` guard:

```js
if (!process.env.COD_ENABLED || process.env.COD_ENABLED !== 'true') {
    return res.json({ success: false, message: 'Cash on delivery not available' });
}
```

---

## [MEDIUM] `req.body.amount` is not validated to be a positive finite number before being used in hash generation

**File:** `backend/controllers/orderController.js:35`

**Issue:** `parseFloat(req.body.amount).toFixed(2)` will produce `"NaN"` if `amount` is `undefined`, a string like `"abc"`, or an object. `"NaN"` would then be included in the SHA-512 hash string and sent to Easebuzz, causing an unpredictable gateway error rather than a clean validation failure.

**Fix:**

```js
const rawAmount = parseFloat(req.body.amount);
if (!isFinite(rawAmount) || rawAmount <= 0) {
    return res.json({ success: false, message: 'Invalid order amount' });
}
const amount = rawAmount.toFixed(2);
```

---

## [MEDIUM] Missing input validation on `placeOrder` required fields before writing to DB

**File:** `backend/controllers/orderController.js:23-62`

**Issue:** `req.body.items`, `req.body.address`, `req.body.address.firstName`, `req.body.address.email`, and `req.body.address.phone` are all used without null/undefined checks. If any field is missing, the order is partially saved to the DB before the code throws, leaving a corrupt record. `firstname` and `email` being `undefined` would also produce `"undefined"` in the hash string, causing a gateway mismatch.

**Fix:** Validate required fields at the top of the handler:

```js
const { items, amount, address } = req.body;
if (!items?.length || !amount || !address?.firstName || !address?.email || !address?.phone) {
    return res.json({ success: false, message: 'Missing required order fields' });
}
```

---

## [MEDIUM] `date` field in orderModel uses `Date.now()` evaluated at module load time — all orders share the same timestamp

**File:** `backend/models/orderModel.js:9`

**Issue:** `default: Date.now()` calls `Date.now()` immediately when the module is first imported. Every subsequent order that relies on the default gets the same timestamp (the server boot time). This breaks any date-based sorting or filtering.

**Fix:** Pass the function reference, not its return value:

```js
date: { type: Date, default: Date.now }
//                                  ^ no parentheses
```

---

## [MEDIUM] `easebuzzCallback` deletes the order on any non-success outcome, including transient gateway errors

**File:** `backend/controllers/orderController.js:86`

**Issue:** `await orderModel.findByIdAndDelete(txnid)` runs whenever the hash check fails or `status !== 'success'`. Easebuzz can POST callbacks with `status: 'pending'` or `status: 'userCancelled'` — these are not final failure states. Deleting the order on a pending callback means the user cannot retry payment.

**Fix:** Only delete on definitive failure statuses. For pending/in-progress statuses, do nothing and let the user return:

```js
const FINAL_FAILURE_STATUSES = ['failure', 'failed', 'bounced'];
if (computedHash === hash && status === 'success') {
    await orderModel.findByIdAndUpdate(txnid, { payment: true });
    return res.redirect(`${frontend_URL}/verify?success=true&orderId=${txnid}`);
}
if (FINAL_FAILURE_STATUSES.includes(status)) {
    await orderModel.findByIdAndDelete(txnid);
}
res.redirect(`${frontend_URL}/verify?success=false&orderId=${txnid}`);
```

---

## [MEDIUM] `txnid` is the raw MongoDB `_id` string — leaks internal DB structure to the payment gateway and to the client

**File:** `backend/controllers/orderController.js:34`

**Issue:** Using `newOrder._id.toString()` as the Easebuzz `txnid` exposes the MongoDB ObjectId to Easebuzz and to the browser. ObjectIds encode the server timestamp and machine identifier, which can assist fingerprinting. Additionally, if an attacker knows a valid ObjectId, they can call `verifyOrder` or craft a callback (see CRITICAL finding above).

**Fix (low priority once verifyOrder is removed):** Generate a separate random transaction ID (e.g., `crypto.randomBytes(16).toString('hex')`) stored as a field on the order document, and use that as `txnid`.

---

## [LOW] `console.log(error)` used for error reporting throughout — no structured logging

**File:** `backend/controllers/orderController.js:60`, `89`, `107`, `118`, `128`

**Issue:** Raw `console.log` dumps full error objects including stack traces to stdout. In production this leaks internal structure (file paths, DB query details) to anyone with log access, and errors are not correlated or searchable.

**Fix:** Replace with a structured logger (e.g., `pino`, `winston`) and log at `error` level. Do not surface internal error messages to the client response.

---

## [LOW] `deliveryCharge` constant is declared but never used in any calculation

**File:** `backend/controllers/orderController.js:5`

**Issue:** `const deliveryCharge = 50` is defined at module level but is not applied when computing the order amount. The delivery charge is presumably already baked into `req.body.amount` by the frontend, which means the server has no authority over whether it is charged correctly.

**Fix:** Remove the unused constant or actually apply it server-side as part of the amount recalculation described in the [HIGH] finding above.

---

## [LOW] `adminAuth` middleware responds with `res.json` instead of proper HTTP status codes

**File:** `backend/middleware/adminAuth.js:5`, `11`

**Issue:** Unauthorized responses return HTTP 200 with `{ success: false }` rather than HTTP 401/403. This makes it impossible for standard API clients, proxies, and monitoring tools to detect auth failures by status code.

**Fix:**

```js
if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });
// ...
res.status(403).json({ success: false, message: 'Not authorized' });
```

---

## Summary

| Severity | Count | Key Issues |
|----------|-------|------------|
| CRITICAL | 5 | Unauthenticated payment-bypass via `/verify`; unauthenticated `/status` mutation; unauthenticated `/list` PII leak; broken response hash formula (wrong field count); timing-unsafe hash comparison |
| HIGH | 4 | Client-controlled `amount` (price tampering); orphan orders on payment abandonment; missing callback field guards; COD lacks business-rule enforcement |
| MEDIUM | 5 | Missing input validation before DB write; `Date.now()` evaluated at module load; deletes orders on non-final Easebuzz statuses; `txnid` exposes MongoDB ObjectId |
| LOW | 4 | Unused `deliveryCharge` constant; `console.log` in production paths; `adminAuth` returns HTTP 200 for auth failures |

**The two issues requiring immediate attention before production use are:**
1. Delete or properly secure the `/verify` endpoint — it is a complete payment bypass.
2. Fix the `verifyResponseHash` pipe count — the current implementation will reject every legitimate Easebuzz success callback and delete valid paid orders.
