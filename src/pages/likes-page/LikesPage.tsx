import { Box, Typography } from "@mui/material";

import Header from "../../components/header/Header";
import MovieList from "../../components/movie-list/MovieList";

import type { MovieFullInfo } from "../../types/movies";

const LikesPage: React.FC = () => {
  const favoritesString = localStorage.getItem("favoriteMovies");
  const favoriteMovies: MovieFullInfo[] = favoritesString
    ? JSON.parse(favoritesString)
    : [];

  return (
    <>
      <Header />
      <Box>
        <Box display={"flex"} justifyContent={"center"} paddingTop={3}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Избранные фильмы
          </Typography>
        </Box>
        <MovieList variant="favorites" movieList={favoriteMovies} />
      </Box>
    </>
  );
};

export default LikesPage;
