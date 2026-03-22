import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const useMovieFilters = () => {
  const [searchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      "genres.name": searchParams.getAll("genres")?.join(", ") || undefined,
      year: searchParams.get("year")?.split(",").join("-") || undefined,
      "rating.imdb":
        searchParams.get("rating")?.split(",").join("-") || undefined,
    };
  }, [searchParams]);

  return filters;
};
