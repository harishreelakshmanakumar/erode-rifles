/**
 * Shared image error handler — falls back to an SVG placeholder
 * so broken images never leave an empty hole in the UI.
 */
const PLACEHOLDER_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23f5f5f5'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' font-family='sans-serif' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export function handleImageError(e) {
  const img = e.currentTarget;
  // Prevent infinite loop if the placeholder itself fails
  if (img.src !== PLACEHOLDER_URI) {
    img.src = PLACEHOLDER_URI;
  }
}

export { PLACEHOLDER_URI };
