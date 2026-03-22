import { Box, Typography, Chip, useTheme } from "@mui/material";
import noImagePic from "../../assets/no-image.png";
import { getLengthStr } from "../../helpers/movie-helpers";
import type { MovieFullInfo } from "../../types/movies";

interface MovieDetailsProps {
  movieInfo: MovieFullInfo;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movieInfo }) => {
  const theme = useTheme();
  return (
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
            backgroundColor: theme.palette.background.default,
            overflow: "hidden",
          }}
        >
          {movieInfo?.poster?.url ? (
            <Box
              component="img"
              src={movieInfo.poster.url}
              alt={`${movieInfo.alternativeName} poster`}
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

      <Box sx={{ flex: 1, padding: "56px 0" }}>
        <Typography variant="h4" gutterBottom>
          {movieInfo?.name || movieInfo?.alternativeName}{" "}
          {movieInfo?.year && `(${movieInfo.year})`}
        </Typography>

        {movieInfo?.description && (
          <Typography
            variant="subtitle1"
            gutterBottom
            textAlign="left"
            sx={{ lineHeight: "1.5" }}
          >
            {movieInfo.description}
          </Typography>
        )}

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {movieInfo?.rating?.imdb ? (
            <Typography variant="body1">
              Рейтинг: {movieInfo.rating.imdb}
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
  );
};
