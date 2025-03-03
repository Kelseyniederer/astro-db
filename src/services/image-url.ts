import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

const getCroppedImageUrl = (url: string) => {
  const target = "media/";
  const index = url?.indexOf(target) + target?.length;
  return url
    ? url.slice(0, index) + "crop/600/400/" + url.slice(index)
    : noImage;
};

export default getCroppedImageUrl;
