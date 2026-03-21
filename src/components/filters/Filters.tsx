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
// import { testData } from "./testData";
import { encodeFilters, generateMarks } from "../../helpers/filters-helpers";
import { useSearchParams } from "react-router";
import type { Filters } from "../../types/filters/filters";
import { getFilterValues } from "../../api/filters-api/filtersApi";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import NothingFound from "../../shared/nothing-found/NothingFound";
import Loader from "../../shared/loader/Loader";

const currentYear = new Date().getFullYear();
const yearMarks = generateMarks(1990, currentYear, 5);
const ratingMarks = generateMarks(0, 10, 1);

const initFilters: Filters = {
  genres: [],
  year: [1990, currentYear],
  rating: [0, 10],
};

function FiltersBox() {
  const [filters, setFilters] = useState<Filters>(initFilters);
  const [searchParams, setSearchParams] = useSearchParams();

  const [expanded, setExpanded] = useState<boolean>(true);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // setGenres(testData.map((entry) => entry.name));
    setLoading(true);
    getFilterValues()
      .then((response: AxiosResponse) => {
        setGenres(
          response.data.map((entry: typeof response.data) => entry.name),
        );
      })
      .catch((error: AxiosError) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const genresParam = searchParams.get("genres");
    const yearParam = searchParams.get("year");
    const ratingParam = searchParams.get("rating");

    setFilters({
      genres: genresParam?.split(",") || [],
      year: yearParam?.split(",").map(Number) || [1990, currentYear],
      rating: ratingParam?.split(",").map(Number) || [0, 10],
    });
  }, [searchParams]);

  const updateUrl = (newFilters: typeof initFilters) => {
    const params = new URLSearchParams();
    encodeFilters(newFilters, params);
    setSearchParams(params);
  };

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleFiltersChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const handleFilterApply = () => {
    updateUrl(filters);
  };

  const handleClearFilters = () => {
    setFilters(initFilters);
    updateUrl(initFilters);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<typeof filters.genres>,
  ) => {
    const value = event.target.value as string[];
    handleFiltersChange("genres", value);
  };

  const handleSliderChange = (
    key: keyof typeof filters,
    value: number | number[],
  ) => {
    handleFiltersChange(key, value);
  };

  return (
    <Paper
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
          width: "100%",
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

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ px: 3, py: 3 }}
        >
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Typography width={"10%"} minWidth={"80px"}>
              Жанры:
            </Typography>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="genres-label">
                Выберите один или несколько...
              </InputLabel>

              <Select
                labelId="genres-label"
                id="genres"
                label="Выберите один или несколько..."
                multiple
                value={filters.genres}
                onChange={handleSelectChange}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {selected.join(", ")}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "30vh",
                      overflowY: "auto",
                    },
                  },
                }}
              >
                {loading && <Loader />}
                {!loading && genres.length === 0 && <NothingFound />}
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <Checkbox
                      checked={
                        filters?.genres && filters.genres.indexOf(genre) > -1
                      }
                    />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display={"flex"} gap={3} alignItems={"center"}>
            <Typography width={"10%"} minWidth={"80px"} sx={{ flexShrink: 0 }}>
              Год выпуска:
            </Typography>
            <Slider
              value={filters.year}
              onChange={(_, value) => handleSliderChange("year", value)}
              valueLabelDisplay="auto"
              min={1990}
              max={currentYear}
              step={1}
              sx={{ mb: 3 }}
              marks={yearMarks}
            />
          </Box>

          <Box display={"flex"} gap={3} alignItems={"center"}>
            <Typography width={"10%"} minWidth={"80px"} sx={{ flexShrink: 0 }}>
              Рейтинг:
            </Typography>
            <Slider
              value={filters.rating}
              onChange={(_, value) => handleSliderChange("rating", value)}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={1}
              sx={{ mb: 3 }}
              marks={ratingMarks}
            />
          </Box>

          <Box display={"flex"} gap={1}>
            <Button
              variant="contained"
              onClick={handleFilterApply}
              sx={{
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
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              sx={{
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
              Очистить фильтры
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default FiltersBox;
