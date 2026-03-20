import { createContext, useState, type ReactNode } from "react";
import type { Movie } from "../../../types/movies/movies";

export const CompareContext = createContext<{
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  clearMovies: () => void;
}>({
  movies: [],
  addMovie: (movie) => {},
  clearMovies: () => {},
});

interface Props {
  children: ReactNode;
}

export const CompareProvider: React.FC<Props> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const addMovie = (movie: Movie) => {
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
