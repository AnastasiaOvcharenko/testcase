import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import { CompareContext } from "../../../pages/main-page/state/CompareContext";
import { getLengthStr } from "../../../helpers/movie-helpers";
import type { Genre, Movie } from "../../../types/movies/movies";

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
        src={movie.poster?.url}
        alt={movie.name}
        sx={{ width: 80, height: 120, mb: 1, bgcolor: "#f0f0f0" }}
        variant="rounded"
      />
      <Typography
        variant="body2"
        align="center"
        noWrap
        sx={{
          lineHeight: 1.1,
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {movie.name || movie.alternativeName || "-"}
      </Typography>
    </Box>
  );

  return (
    <Box
      height="100%"
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      overflow="auto"
    >
      <Box display="flex" justifyContent="center" mb={2} width="100%">
        {movies?.map((movie, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="150px"
            mx={1}
          >
            {renderMovieCell(movie)}
          </Box>
        ))}
      </Box>

      <TableContainer
        component={Paper}
        sx={{ width: "100%", mx: "auto", boxShadow: "none" }}
      >
        <Table aria-label="comparison table">
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <TableCell sx={{ fontWeight: "bold", minWidth: 150 }}>
                  {row.label}
                </TableCell>
                {movies.map((movie, index) => (
                  <TableCell key={index} align="center">
                    {row.getValue(movie)}
                  </TableCell>
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
