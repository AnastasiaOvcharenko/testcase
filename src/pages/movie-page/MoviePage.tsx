import { useParams } from "react-router";
import { Box, Chip, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import noImagePic from "../../assets/no-image.png";
import { testData } from "./testData";
import Header from "../../components/header/Header";
import type { MovieFullInfo } from "../../types/movies/movies";

export function MoviePage() {
  let params = useParams();
  const [movieInfo, setMovieInfo] = useState<MovieFullInfo | null>(null);

  useEffect(() => {
    // getMovieInfo(params.movieId)
    //   .then((response) => {
    //     setMovieInfo(response.data);
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setMovieInfo(testData);
  }, [params.movieId]);

  // if (!movieInfo) {
  //   return <Typography>Loading...</Typography>;
  // }

  const hours = Math.floor((movieInfo?.movieLength || 0) / 60);
  const minutes = (movieInfo?.movieLength || 0) % 60;
  const lengthStr = `${hours}ч ${minutes}мин`;

  const handleAddToFavorites = () => {
    alert("Added to favourites!");
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
          variant="contained"
          color="error"
          onClick={handleAddToFavorites}
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
          Добавить в избранное
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
            <Typography variant="h4" gutterBottom textAlign="center">
              {movieInfo?.alternativeName} ({movieInfo?.year})
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              justifyContent="center"
              mb={2}
            >
              {movieInfo?.rating && (
                <Typography variant="body1">
                  IMDB Rating: {movieInfo?.rating.imdb}
                </Typography>
              )}
              <Typography variant="body1">Length: {lengthStr}</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
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
    </Box>
  );
}

export default MoviePage;
