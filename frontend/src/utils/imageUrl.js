const getImageUrl = (baseUrl, image) => {
  if (!image) return "";
  // Full URL (Unsplash, S3, etc.) or data URI — use as-is
  if (image.startsWith("data:") || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  // Vite-bundled asset (absolute path like /assets/food_1-abc.png) — use as-is
  if (image.startsWith("/")) {
    return image;
  }
  // Legacy filename stored in DB (e.g. "food_1.jpg") — served from backend /images/
  return `${baseUrl}/images/${image}`;
};

export default getImageUrl;
