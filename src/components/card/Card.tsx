import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router";

import noImagePic from "../../assets/no-image.png";
import { getColorByRating } from "../../helpers/search-helpers";
import { CompareContext } from "../../pages/main-page/state/CompareContext";

import type { Movie } from "../../types/movies/movies";


interface MovieCardProps {
  movie: Movie;
  variant: "main" | "favorites";
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, variant }) => {
  const { addMovie } = useContext(CompareContext);
  const navigate = useNavigate();

  return (
    <Box component={"div"} onClick={() => navigate(`/movie/${movie.id}`)}>
      <Card
        sx={{
          minWidth: "200px",
          width: "17vw",
          height: "65vh",
          maxHeight: "400px",
          maxWidth: "250px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="70%"
          image={movie.poster?.previewUrl || noImagePic}
          alt={`${movie.alternativeName} poster`}
          sx={{
            objectFit: "cover",
            ...(movie.poster?.previewUrl
              ? {}
              : {
                  margin: "auto",
                  maxWidth: 80,
                  objectFit: "contain",
                }),
          }}
        />
        <div style={{ flexGrow: 1 }} />
        <CardContent
          sx={{
            paddingTop: 0,
            paddingBottom: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              lineHeight: 1.2,
              fontWeight: "bold",
              maxHeight: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.name || movie.alternativeName} {movie.year}
          </Typography>
          {movie?.rating?.imdb ? (
            <Box display="flex" flexDirection={"row"} gap="1">
              <Typography variant="body2">Рейтинг:</Typography>
              <Typography
                variant="body2"
                color={getColorByRating(movie?.rating?.imdb)}
                sx={{ fontWeight: "bold", marginX: "5px" }}
              >
                {movie?.rating?.imdb}
              </Typography>
            </Box>
          ) : null}
        </CardContent>
        <Box display={"flex"} justifyContent={"right"}>
          {variant === "main" && (
            <Button
              onClick={(event) => {
                event.stopPropagation();
                addMovie(movie);
              }}
              variant="contained"
              color="primary"
              size="small"
              sx={{
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              Сравнить
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};
