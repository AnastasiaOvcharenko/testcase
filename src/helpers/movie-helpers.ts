import type { Movie } from "../types/movies/movies";

export const getLengthStr = function (movieInfo: Movie) {
  const hours = Math.floor((movieInfo?.movieLength || 0) / 60);
  const minutes = (movieInfo?.movieLength || 0) % 60;
  const lengthStr = `${hours !== 0 ? `${hours}ч ` : ""}${minutes}мин`;

  return lengthStr;
};
