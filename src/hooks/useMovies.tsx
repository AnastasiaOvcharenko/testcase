import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getMoviesByFilters } from "../api/movie-api/movieListApi";
import type { Movie } from "../types/movies";
import type { AxiosResponse } from "axios";

interface UseMoviesProps {
  filters: Record<string, string | undefined>;
  shouldFetch: boolean;
  setShouldFetch: (value: boolean) => void;
}

export const useMovies = ({
  filters,
  shouldFetch,
  setShouldFetch,
}: UseMoviesProps) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [next, setNext] = useState<string>("");
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMovieList([]);
    setNext("");
    setHasNext(true);
    setShouldFetch(true);
  }, [filters, setShouldFetch]);

  useEffect(() => {
    if (!shouldFetch || !hasNext) return;

    setLoading(true);
    getMoviesByFilters({
      limit: 50,
      next: next,
      ...filters,
    })
      .then((response: AxiosResponse) => {
        if (next === "") {
          setMovieList(response?.data?.docs || []);
        } else {
          setMovieList((prev) => [...prev, ...(response?.data?.docs || [])]);
        }
        setNext(response.data.next);
        setHasNext(response.data.hasNext);
      })
      .catch(() => {
        toast.error("Произошла ошибка при загрузке фильмов");
      })
      .finally(() => {
        setShouldFetch(false);
        setLoading(false);
      });
  }, [shouldFetch, filters, next, hasNext, setShouldFetch]);

  return {
    movieList,
    loading,
    hasNext,
  };
};
