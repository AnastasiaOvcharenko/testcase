import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import { useContext } from "react";

import noImagePic from "../../../assets/no-image.png";
import { getLengthStr } from "../../../helpers/movie-helpers";
import { CompareContext } from "../../../pages/main-page/state/CompareContext";

import type { Genre, Movie } from "../../../types/movies";

const ComparisonTable: React.FC = () => {
  const { movies } = useContext(CompareContext);
  const theme = useTheme();

  const renderGenres = (genres: Genre[] | undefined) => {
    if (!genres || genres.length === 0) return "-";
    return genres
      .map((g) => g.name)
      .filter(Boolean)
      .join(", ");
  };

  const rows = [
    {
      label: "Постер",
      getValue: (movie: Movie) => renderMovieCell(movie),
    },
    {
      label: "Название",
      getValue: (movie: Movie) => movie.name || movie.alternativeName || "-",
    },
    {
      label: "Год выпуска",
      getValue: (movie: Movie) => movie.year || "-",
    },
    {
      label: "Рейтинг IMDb",
      getValue: (movie: Movie) =>
        movie?.rating?.imdb ? movie.rating.imdb.toFixed(1) : "-",
    },
    {
      label: "Жанры",
      getValue: (movie: Movie) => renderGenres(movie?.genres),
    },
    {
      label: "Длительность",
      getValue: (movie: Movie) =>
        movie.movieLength ? getLengthStr(movie) : "-",
    },
  ];

  if (movies.length === 0)
    return (
      <Box
        height="100%"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography>Добавьте фильм!</Typography>
      </Box>
    );

  const renderMovieCell = (movie: Movie) => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={1}
      width={"100%"}
    >
      <Avatar
        src={movie.poster?.previewUrl || noImagePic}
        alt={movie.name}
        sx={{
          width: 60,
          height: 90,
          mb: 1,
          bgcolor: theme.palette.background.default,
          ...(movie.poster?.previewUrl
            ? {
                "& img": {
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                },
              }
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& img": {
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                },
              }),
        }}
        variant="rounded"
      />
    </Box>
  );

  return (
    <Grid
      display={"grid"}
      height={"100%"}
      gap={1}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gridTemplateRows={"repeat(5, auto)"}
      alignItems={"center"}
      padding={1}
    >
      {rows.map((row) => (
        <>
          <Typography
            sx={{ gridColumn: 1, fontWeight: "bold", textAlign: "center" }}
          >
            {row.label}
          </Typography>
          {movies.map((movie, i) => (
            <>
              <Typography textAlign={"center"} sx={{ gridColumn: i + 2 }}>
                {row.getValue(movie)}
              </Typography>
            </>
          ))}
        </>
      ))}
    </Grid>
  );
};

export default ComparisonTable;
