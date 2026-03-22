import { Box, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { getMovieInfo } from "../../api/movie-api/movieInfoApi";
import ConfirmModal from "../../components/confirm-modal/confirmModal";
import Header from "../../components/header/Header";
import Loader from "../../shared/loader/Loader";
import NothingFound from "../../shared/nothing-found/NothingFound";

import type { MovieFullInfo } from "../../types/movies";
import type { AxiosResponse } from "axios";
import { MovieDetails } from "../../components/movie-details/MovieDetails";
import { useFavorites } from "../../hooks/useFavourites";

export const MoviePage: React.FC = () => {
  const params = useParams();
  const [movieInfo, setMovieInfo] = useState<MovieFullInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavorites(movieInfo);

  useEffect(() => {
    setIsLoading(true);
    getMovieInfo(params.movieId)
      .then((response: AxiosResponse) => {
        setMovieInfo(response.data);
      })
      .catch(() => {
        toast.error("Произошла ошибка при загрузке фильма");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.movieId]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFavoritesToggle = () => {
    if (!movieInfo) return;

    if (isFavorite) {
      removeFromFavorites(movieInfo?.id);
    } else {
      addToFavorites(movieInfo);
    }
    handleCloseModal();
  };

  return (
    <Box>
      <Header />
      <Paper
        sx={{
          padding: 4,
          maxWidth: "70vw",
          minHeight: "70vh",
          margin: "auto",
          display: "flex",
          mt: 4,
          boxShadow: 3,
          borderRadius: 3,
          position: "relative",
        }}
      >
        {movieInfo && (
          <>
            <Button
              variant={isFavorite ? "outlined" : "contained"}
              color={isFavorite ? "secondary" : "primary"}
              onClick={handleOpenModal}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                textTransform: "none",
                fontSize: "1rem",
                paddingX: 2,
                paddingY: 1,
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            </Button>
            <MovieDetails movieInfo={movieInfo} />
          </>
        )}
        {isLoading && <Loader />}
        {!isLoading && !movieInfo && <NothingFound />}
      </Paper>

      <ConfirmModal
        isFavorite={isFavorite}
        open={isModalOpen}
        movieName={movieInfo?.name || movieInfo?.alternativeName}
        onClose={handleCloseModal}
        onConfirm={handleFavoritesToggle}
      />
    </Box>
  );
};

export default MoviePage;
