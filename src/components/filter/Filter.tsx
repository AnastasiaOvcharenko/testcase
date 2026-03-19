import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Slider,
  Typography,
  IconButton,
  Collapse,
  Button,
  Paper,
  type SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { testData } from "./testData";
import { encodeFilters, generateMarks } from "../../helpers/filters-helpers";
import { getFilterValues } from "../../api/filters-api/filtersApi";
import { useSearchParams } from "react-router";
import type { Filters } from "../../types/filters/filters";

const currentYear = new Date().getFullYear();

const yearMarks = generateMarks(1990, currentYear, 5);
const ratingMarks = generateMarks(0, 10, 1);

function Filter() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [rating, setRating] = useState<number[]>([0, 10]);
  const [year, setYear] = useState<number[]>([1990, currentYear]);
  const [genres, setGenres] = useState<string[]>([]);

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    setGenres(testData.map((entry) => entry.name));
    // console.log(genres);
    // getFilterValues()
    //   .then(function (response) {
    //     setGenres(response.data.map((entry) => entry.name));
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     // setFetching(false);
    //     // setLoading(false);
    //   });
  }, []);

  const updateUrl = (filters: Filters) => {
    const params = new URLSearchParams();
    const paramsString = encodeFilters(filters, params);
    setSearchParams(paramsString);
  };

  const onFilterSubmit = (filters: Filters) => {
    updateUrl(filters);
  };

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleGenresChange = (
    event: SelectChangeEvent<typeof selectedGenres>,
  ) => {
    const value = event?.target?.value;
    setSelectedGenres(typeof value === "string" ? [value] : value);
  };

  const handleRatingChange = (_: Event, value: typeof rating) => {
    setRating(value);
  };

  const handleYearChange = (_: Event, value: typeof year) => {
    setYear(value);
  };

  const handleSubmit = () => {
    onFilterSubmit({
      genres: selectedGenres,
      year,
      rating,
    });
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: 2,
          overflow: "hidden",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            cursor: "pointer",
          }}
          onClick={handleToggle}
        >
          <Typography variant="h6" component="div">
            Фильтры
          </Typography>
          <IconButton aria-label={expanded ? "Collapse" : "Expand"}>
            <ExpandMoreIcon
              sx={{
                transition: "transform 0.3s",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ px: 3, py: 3 }}>
            <Typography gutterBottom>Жанры</Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel htmlFor="genres-label">
                Выберите один или несколько...
              </InputLabel>

              <Select
                labelId="genres-label"
                id="genres"
                label="Выберите один или несколько..."
                multiple
                value={selectedGenres}
                onChange={handleGenresChange}
                displayEmpty
                renderValue={(selected) => selected.join(", ")}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography gutterBottom>Год выпуска</Typography>
            <Slider
              value={year}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={1990}
              max={currentYear}
              step={1}
              sx={{ mb: 3 }}
              marks={yearMarks}
            />
            <Typography gutterBottom>Рейтинг</Typography>
            <Slider
              value={rating}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={0.1}
              sx={{ mb: 3 }}
              marks={ratingMarks}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: 2,
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
              Применить фильтры
            </Button>
          </Box>
        </Collapse>
      </Paper>
    </>
  );
}

export default Filter;
