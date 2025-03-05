import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Use `w500`, `original`, etc.

const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage; // If no image, return placeholder

  // Check if URL is a TMDB path (they start with "/")
  if (url.startsWith("/")) {
    return `${TMDB_IMAGE_BASE_URL}${url}`;
  }

  // Keep existing logic for non-TMDB images
  const target = "media/";
  const index = url?.indexOf(target) + target.length;
  return url.includes(target)
    ? url.slice(0, index) + "crop/600/400/" + url.slice(index)
    : url;
};

export default getCroppedImageUrl;
