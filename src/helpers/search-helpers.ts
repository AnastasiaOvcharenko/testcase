export const getColorByRating = function (rating?: number) {
  if (rating && rating > 8) return "green";
  return "gray";
};
