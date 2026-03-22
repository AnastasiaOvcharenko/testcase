import { createContext } from "react";

import type { Movie } from "../../../types/movies";

export const CompareContext = createContext<{
  movies: Movie[];
  addMovie: (movie?: Movie) => void;
  clearMovies: () => void;
}>({
  movies: [],
  addMovie: () => {},
  clearMovies: () => {},
});
