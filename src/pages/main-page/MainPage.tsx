import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
// import { testData } from "./testData";
import { useSearchParams } from "react-router";
import Header from "../../components/header/Header";
import { getMoviesByFilters } from "../../api/movie-api/movieListApi";
import type { Movie } from "../../types/movies/movies";
import MovieList from "../../components/movie-list/MovieList";
import SidebarCompare from "../../components/sidebar-compare/SidebarCompare";
import { CompareProvider } from "./state/CompareContext";
import FiltersBox from "../../components/filters/Filters";
import Loader from "../../shared/loader/Loader";
import { toast } from "react-toastify";
import type { AxiosError, AxiosResponse } from "axios";
import NothingFound from "../../shared/nothing-found/NothingFound";

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
        100 &&
      next.length > 1
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
      year: searchParams.get("year")?.split(",").join("-") || undefined,
      "rating.imdb":
        searchParams.get("rating")?.split(",").join("-") || undefined,
    };
  }, [searchParams]);

  useEffect(() => {
    setMovieList([]);
    setNext("");
    setFetching(true);
  }, [filtersFromUrl]);

  useEffect(() => {
    if (!fetching) return;
    // setMovieList(testData.docs);
    setLoading(true);
    getMoviesByFilters({
      limit: 50,
      next: next,
      ...filtersFromUrl,
    })
      .then((response: AxiosResponse) => {
        if (next === "") {
          setMovieList(response?.data?.docs || []);
        } else {
          setMovieList((prev) => [...prev, ...(response?.data?.docs || [])]);
        }
        setNext(response.data.next);
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
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
        <Box display={"flex"} gap={1} paddingY={2} paddingX={1}>
          <SidebarCompare />
          <Box
            display={"flex"}
            flexDirection={"column"}
            overflow={"hidden"}
            flexGrow={1}
          >
            <FiltersBox />
            <MovieList movieList={movieList} variant="main" />
            {loading && <Loader />}
            {!loading && movieList.length === 0 && <NothingFound />}
          </Box>
        </Box>
      </CompareProvider>
    </>
  );
};

export default MainPage;
