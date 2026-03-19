import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import noImagePic from "../../assets/no-image.png";
import type { Movie } from "../../types/movies/movies";
import { getColorByRating } from "../../helpers/search-helpers";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card
      sx={{
        width: "17vw",
        height: "65vh",
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
          paddingBottom: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{ lineHeight: 1.2, fontWeight: "bold" }}
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
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
