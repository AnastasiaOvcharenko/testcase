import { useParams } from "react-router";
import { Box, Chip, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import noImagePic from "../../assets/no-image.png";
// import { testData } from "./testData";
import Header from "../../components/header/Header";
import type { MovieFullInfo } from "../../types/movies/movies";
import { getMovieInfo } from "../../api/movie-api/movieInfoApi";
import { getLengthStr } from "../../helpers/movie-helpers";
import ConfirmModal from "./confirm-modal/confirmModal";
import Loader from "../../shared/loader/Loader";

export function MoviePage() {
  let params = useParams();
  const [movieInfo, setMovieInfo] = useState<MovieFullInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovieInfo(params.movieId)
      .then((response) => {
        setMovieInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.movieId]);

  useEffect(() => {
    if (movieInfo) {
      const favoritesString = localStorage.getItem("favoriteMovies");
      const favoriteMovies: MovieFullInfo[] = favoritesString
        ? JSON.parse(favoritesString)
        : [];
      const exists = favoriteMovies.some((f) => f.id === movieInfo.id);
      setIsFavorite(exists);
    }
  }, [movieInfo]);

  if (isLoading) {
    return <Loader />;
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFavorites = () => {
    if (!movieInfo) return;
    const favoritesKey = "favoriteMovies";

    const favoritesString = localStorage.getItem(favoritesKey);
    let favoriteMovies: MovieFullInfo[] = favoritesString
      ? JSON.parse(favoritesString)
      : [];

    if (isFavorite) {
      favoriteMovies = favoriteMovies.filter((f) => f.id !== movieInfo.id);
    } else {
      favoriteMovies.push(movieInfo);
    }
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteMovies));
    setIsFavorite((isFavorite) => !isFavorite);
  };

  const handleConfirmAddition = () => {
    if (movieInfo) {
      handleFavorites();
    }
    handleCloseModal();
  };

  return (
    <Box>
      <Header />
      <Paper
        sx={{
          padding: 4,
          maxWidth: 800,
          margin: "auto",
          mt: 4,
          boxShadow: 3,
          borderRadius: 3,
          position: "relative",
        }}
      >
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

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          gap={3}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", md: 300 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 300,
                height: 450,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#f0f0f0",
                overflow: "hidden",
              }}
            >
              {movieInfo?.poster?.url ? (
                <Box
                  component="img"
                  src={movieInfo?.poster.url}
                  alt={`${movieInfo?.alternativeName} poster`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={noImagePic}
                  alt="No poster available"
                  sx={{
                    maxWidth: "80%",
                    maxHeight: "80%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {movieInfo?.name || movieInfo?.alternativeName} ({movieInfo?.year}
              )
            </Typography>
            {movieInfo?.description ? (
              <Typography
                variant="subtitle1"
                gutterBottom
                textAlign="left"
                sx={{ lineHeight: "1.5" }}
              >
                {movieInfo?.description}
              </Typography>
            ) : (
              <></>
            )}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {movieInfo?.rating?.imdb ? (
                <Typography variant="body1">
                  Рейтинг: {movieInfo?.rating.imdb}
                </Typography>
              ) : (
                <></>
              )}
              {movieInfo?.movieLength ? (
                <Typography variant="body1">
                  Длительность: {getLengthStr(movieInfo)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {movieInfo?.genres?.map((genre) => (
                <Chip
                  key={genre.name}
                  label={genre.name}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
      <ConfirmModal
        isFavorite={isFavorite}
        open={isModalOpen}
        movieName={movieInfo?.name || movieInfo?.alternativeName}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAddition}
      />
    </Box>
  );
}

export default MoviePage;
