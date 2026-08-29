export const getImageUrl = (path) => {
  return `/assets/${path.replace(/^\/+/, "")}`;
};