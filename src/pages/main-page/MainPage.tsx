import { useEffect, useState } from "react";
import { Box, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { testData } from "./testData";
import { useNavigate, useSearchParams } from "react-router";
import Header from "../../components/header/Header";
import { MovieCard } from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import { getMoviesByFilters } from "../../api/movie-api/movieListApi";
import { encodeFilters } from "../../helpers/filters-helpers";
import type { Movie } from "../../types/movies/movies";

const MainPage = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [next, setNext] = useState<string>("");
  const [fetching, setFetching] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [hasNext, setHasNext] = useState<Boolean>(true);

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
      hasNext
    ) {
      setFetching(true);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    setMovieList(testData.docs);
    // setLoading(true);
    // getMoviesByFilters({
    //   limit: 50,
    //   next: next,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     console.log(response.data.hasNext);
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
  }, [fetching]);

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
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          padding: 3,
        }}
      >
        {movieList.map((movie) => {
          return (
            <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <MovieCard movie={movie} />
            </div>
          );
        })}

        {loading ? <div>Загрузка...</div> : <></>}
      </Grid>
    </>
  );
};

export default MainPage;
