import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { CompareContext } from "../../../pages/main-page/state/CompareContext";
import { getLengthStr } from "../../../helpers/movie-helpers";
import type { Genre, Movie } from "../../../types/movies/movies";
// import noImagePic from "../../../assets/no-image.png";

const ComparisonTable = () => {
  const { movies } = useContext(CompareContext);

  const renderGenres = (genres: Genre[] | undefined) => {
    if (!genres || genres.length === 0) return "-";
    return genres
      .map((g) => g.name)
      .filter(Boolean)
      .join(", ");
  };

  const rows = [
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
        movie.rating?.imdb !== undefined ? movie.rating.imdb.toFixed(1) : "-",
    },
    {
      label: "Жанры",
      getValue: (movie: Movie) => renderGenres(movie?.genres),
    },
    {
      label: "Длительность",
      getValue: (movie: Movie) => getLengthStr(movie),
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
  return (
    <Box height="100%" display={"flex"} alignItems={"center"}>
      <TableContainer component={Paper} sx={{ margin: "auto", height: "100%" }}>
        <Table aria-label="comparison table">
          <TableHead></TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>{row.label}</TableCell>
                {movies.map((movie, index) => (
                  <TableCell key={index}>{row.getValue(movie)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComparisonTable;
