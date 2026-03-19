import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import noImagePic from "../../assets/no-image.png";
import type { Movie } from "../../types/movies/movies";

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
          sx={{ lineHeight: 1.2 }}
        >
          {movie.alternativeName} ({movie.year})
        </Typography>
        <Rating value={movie.rating?.imdb} readOnly precision={0.5} />
      </CardContent>
    </Card>
  );
}
