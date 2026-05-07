import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

// 🔥 Global Error Handlers (never let your app die silently)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// 🚀 App Config
const app = express();

// 🧩 Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🌍 CORS - Fully open but safe for dev
app.use(cors({
  origin: true, // allow all origins dynamically
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

// 🛑 Handle preflight requests
app.options("*", cors());

// 🔍 Debug incoming requests (optional but useful)
app.use((req, res, next) => {
  console.log(`${req.method} request from ${req.headers.origin || "unknown origin"} -> ${req.url}`);
  next();
});

// 🗄️ Database Connection
connectDB();

// 📦 API Routes - Handle both direct and Vercel routing
const apiRoutes = (prefix = '') => {
  app.use(`${prefix}/api/user`, userRouter);
  app.use(`${prefix}/api/food`, foodRouter);
  app.use(`${prefix}/images`, express.static("uploads"));
  app.use(`${prefix}/api/cart`, cartRouter);
  app.use(`${prefix}/api/order`, orderRouter);
  app.use(`${prefix}/api/admin`, adminRouter);
  app.use(`${prefix}/api/review`, reviewRouter);
};

// For Vercel deployment with /_/backend prefix
if (process.env.VERCEL) {
  apiRoutes('/_/backend');
} else {
  apiRoutes();
}

// 🏠 Test Route
app.get("/", (req, res) => {
  res.json({ message: "API Working", status: "success" });
});

// Health check endpoint for Vercel
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Export for Vercel
export default app;

// Start server everywhere except serverless Vercel functions.
if (!process.env.VERCEL) {
  const port = process.env.PORT || 5002;
  const server = app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    console.error("Server Error:", err.message);

    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use.`);
      console.log("Run: kill -9 $(lsof -ti :" + port + ")");
    }
  });
}
