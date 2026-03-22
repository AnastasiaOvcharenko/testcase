import { Grid } from "@mui/material";

import { MovieCard } from "../card/Card";

import type { Movie } from "../../types/movies";

interface MovieListProps {
  movieList: Movie[];
  variant: "main" | "favorites";
}

const MovieList: React.FC<MovieListProps> = ({ movieList, variant }) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        paddingY: 3,
      }}
    >
      {movieList.map((movie) => {
        return <MovieCard key={movie.id} variant={variant} movie={movie} />;
      })}
    </Grid>
  );
};

export default MovieList;
