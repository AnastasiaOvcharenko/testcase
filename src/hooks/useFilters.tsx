import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import { getFilterValues } from "../api/filters-api/filtersApi";
import { encodeFilters } from "../helpers/filters-helpers";
import type { Filters } from "../types/filters";

const currentYear = new Date().getFullYear();
const initFilters: Filters = {
  genres: [],
  year: [1990, currentYear],
  rating: [0, 10],
};

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(initFilters);
  const [genres, setGenres] = useState<string[]>([]);
  const [genresLoading, setGenresLoading] = useState<boolean>(false);

  useEffect(() => {
    setGenresLoading(true);
    getFilterValues()
      .then((response: AxiosResponse) => {
        setGenres(
          response.data.map((entry: typeof response.data) => entry.name),
        );
      })
      .catch(() => toast.error("Произошла ошибка при загрузке фильтров"))
      .finally(() => setGenresLoading(false));
  }, []);

  useEffect(() => {
    const genresParam = searchParams.get("genres");
    const yearParam = searchParams.get("year");
    const ratingParam = searchParams.get("rating");

    setFilters({
      genres: genresParam?.split(",") || [],
      year: yearParam?.split(",").map(Number) || [1990, currentYear],
      rating: ratingParam?.split(",").map(Number) || [0, 10],
    });
  }, [searchParams]);

  const updateUrl = (newFilters: Filters) => {
    const params = new URLSearchParams();
    encodeFilters(newFilters, params);
    setSearchParams(params);
  };

  const handleFiltersChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterApply = () => {
    updateUrl(filters);
  };

  const handleClearFilters = () => {
    setFilters(initFilters);
    updateUrl(initFilters);
  };

  return {
    filters,
    genres,
    genresLoading,
    handleFiltersChange,
    handleFilterApply,
    handleClearFilters,
  };
};
