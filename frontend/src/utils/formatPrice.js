const formatPrice = (amount, currency = "INR") => {
  const value = Number(amount);
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(safeValue);
};

export default formatPrice;
