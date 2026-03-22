import { type ReactNode, useState } from "react";

import { CompareContext } from "./CompareContext";

import type { Movie } from "../../../types/movies/movies";

interface Props {
  children: ReactNode;
}

export const CompareProvider: React.FC<Props> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const addMovie = (movie?: Movie) => {
    if (!movie) return;
    const newMovies = [...movies];
    if (movies.length >= 2) {
      newMovies.shift();
    }
    newMovies.push(movie);
    setMovies(newMovies);
  };

  const clearMovies = () => {
    setMovies([]);
  };

  return (
    <CompareContext.Provider value={{ movies, addMovie, clearMovies }}>
      {children}
    </CompareContext.Provider>
  );
};
