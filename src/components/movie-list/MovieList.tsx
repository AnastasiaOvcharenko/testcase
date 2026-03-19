import { Grid } from "@mui/material";
import type { Movie } from "../../types/movies/movies";
import { useNavigate } from "react-router";
import { MovieCard } from "../card/Card";

interface MovieListProps {
  movieList: Movie[];
}

const MovieList = ({ movieList }: MovieListProps) => {
  const navigate = useNavigate();
  return (
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
    </Grid>
  );
};

export default MovieList;
