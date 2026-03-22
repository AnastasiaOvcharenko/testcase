import { useState, useEffect } from "react";
import type { MovieFullInfo } from "../types/movies";

export const useFavorites = (movieInfo: MovieFullInfo | null) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movieInfo) {
      const favoritesString = localStorage.getItem("favoriteMovies");
      const favoriteMovies: MovieFullInfo[] = favoritesString
        ? JSON.parse(favoritesString)
        : [];
      const exists = favoriteMovies.some((f) => f.id === movieInfo.id);
      setIsFavorite(exists);
    }
  }, [movieInfo]);

  const addToFavorites = (movie?: MovieFullInfo) => {
    if (!movie) return;

    const favoritesKey = "favoriteMovies";
    const favoritesString = localStorage.getItem(favoritesKey);
    let favoriteMovies: MovieFullInfo[] = favoritesString
      ? JSON.parse(favoritesString)
      : [];

    favoriteMovies.push(movie);
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteMovies));
    setIsFavorite(true);
  };

  const removeFromFavorites = (movieId?: number) => {
    if (!movieId) return;

    const favoritesKey = "favoriteMovies";
    const favoritesString = localStorage.getItem(favoritesKey);
    let favoriteMovies: MovieFullInfo[] = favoritesString
      ? JSON.parse(favoritesString)
      : [];

    favoriteMovies = favoriteMovies.filter((f) => f.id !== movieId);
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteMovies));
    setIsFavorite(false);
  };

  return {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
};
