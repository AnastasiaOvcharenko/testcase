import { useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import { testData } from "./testData";
import { useSearchParams } from "react-router";
import Header from "../../components/header/Header";
import { getMoviesByFilters } from "../../api/movie-api/movieListApi";
import type { Movie } from "../../types/movies/movies";
import MovieList from "../../components/movie-list/MovieList";
import SidebarCompare from "../../components/sidebar-compare/SidebarCompare";
import { CompareProvider } from "./state/CompareContext";
import FiltersBox from "../../components/filters/Filters";

const MainPage = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [next, setNext] = useState<string>("");
  const [fetching, setFetching] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchParams] = useSearchParams();

  const scrollHandler = (e: Event) => {
    const target = e.target;
    if (!(target instanceof Document)) return;
    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const filtersFromUrl = useMemo(() => {
    return {
      "genres.name": searchParams.getAll("genres")?.join(", ") || undefined,
      year: searchParams.getAll("year")[0]?.split(",").join("-") || undefined,
      "rating.imdb":
        searchParams.getAll("rating")[0]?.split(",").join("-") || undefined,
    };
  }, [searchParams]);

  useEffect(() => {
    setMovieList([]);
    setNext("");
    setFetching(true);
  }, [filtersFromUrl]);

  useEffect(() => {
    if (!fetching) return;

    setLoading(true);
    getMoviesByFilters({
      limit: 50,
      next: next,
      ...filtersFromUrl,
    })
      .then((response) => {
        if (next === "") {
          setMovieList(response?.data?.docs || []);
        } else {
          setMovieList((prev) => [...prev, ...(response?.data?.docs || [])]);
        }
        setNext(response.data.next);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
        setLoading(false);
      });
  }, [fetching, filtersFromUrl, next]);

  return (
    <>
      <CompareProvider>
        <Header></Header>
        <Grid display={"flex"} gap={1} marginY={2} width={"100%"}>
          <SidebarCompare />
          <Box width={"100%"}>
            <Grid container spacing={4} width={"100%"} justifyContent="center">
              <FiltersBox />
            </Grid>
            <MovieList movieList={movieList} variant="main" />
            {loading ? <div>Загрузка...</div> : <></>}
          </Box>
        </Grid>
      </CompareProvider>
    </>
  );
};

export default MainPage;
