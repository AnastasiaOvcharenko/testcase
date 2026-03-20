import { Grid } from "@mui/material";
import type { Movie } from "../../types/movies/movies";
import { MovieCard } from "../card/Card";

interface MovieListProps {
  movieList: Movie[];
  variant: "main" | "favorites";
}

const MovieList = ({ movieList, variant }: MovieListProps) => {
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
        return <MovieCard variant={variant} movie={movie} />;
      })}
    </Grid>
  );
};

export default MovieList;
