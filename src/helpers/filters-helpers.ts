import type { Filters } from "../types/filters/filters";

export const generateMarks = (
  startYear: number,
  endYear: number,
  interval: number,
): { value: number; label: string }[] => {
  const marks = [];
  for (let year = startYear; year <= endYear; year += interval) {
    marks.push({ value: year, label: year.toString() });
  }
  return marks;
};

export const encodeFilters = (
  filters: Filters,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  params: Record<string, any>,
): string => {
  if (filters.genres && filters.genres.length > 0) {
    params.set("genres", filters.genres.join(","));
  }

  if (filters.year && filters.year.length === 2) {
    params.set("year", filters.year.join(","));
  }

  if (filters.rating && filters.rating.length === 2) {
    params.set("rating", filters.rating.join(","));
  }

  return params.toString();
};
