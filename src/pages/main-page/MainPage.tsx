import { useEffect, useMemo, useState } from "react";
import {  Grid } from "@mui/material";
import { testData } from "./testData";
import { useSearchParams } from "react-router";
import Header from "../../components/header/Header";
import Filter from "../../components/filter/Filter";
import { getMoviesByFilters } from "../../api/movie-api/movieListApi";
import type { Movie } from "../../types/movies/movies";
import MovieList from "../../components/movie-list/MovieList";

const MainPage = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [next, setNext] = useState<string>("");
  const [fetching, setFetching] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [hasNext, setHasNext] = useState<Boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e: Event) => {
    const target = e.target;
    if (!(target instanceof Document)) return;
    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      hasNext &&
      movieList?.length !== 0
    ) {
      setFetching(true);
    }
  };

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
  }, [searchParams]);

  useEffect(() => {
    setMovieList(testData.docs);
    // setLoading(true);
    // getMoviesByFilters({
    //   limit: 50,
    //   next: next,
    //   ...filtersFromUrl,
    // })
    //   .then(function (response) {
    //     setMovieList([...movieList, ...response?.data?.docs]);
    //     setNext(response.data.next);
    //     setHasNext(response.data.next);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setFetching(false);
    //     setLoading(false);
    //   });
  }, [fetching, filtersFromUrl]);

  return (
    <>
      <Header></Header>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          padding: 3,
        }}
      >
        <Filter />
      </Grid>
      <MovieList movieList={movieList} />
      {loading ? <div>Загрузка...</div> : <></>}
    </>
  );
};

export default MainPage;
