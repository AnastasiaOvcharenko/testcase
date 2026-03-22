import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFilters } from "../../hooks/useFilters";
import { useState } from "react";
import { generateMarks } from "../../helpers/filters-helpers";
import Loader from "../../shared/loader/Loader";
import NothingFound from "../../shared/nothing-found/NothingFound";

const currentYear = new Date().getFullYear();
const yearMarks = generateMarks(1990, currentYear, 5);
const ratingMarks = generateMarks(0, 10, 1);

const FiltersBox: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const {
    filters,
    genres,
    genresLoading,
    handleFiltersChange,
    handleFilterApply,
    handleClearFilters,
  } = useFilters();

  const handleSelectChange = (
    event: SelectChangeEvent<typeof filters.genres>,
  ) => {
    handleFiltersChange("genres", event.target.value as string[]);
  };

  const handleSliderChange = (key: keyof typeof filters, value: number[]) => {
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
        onClick={() => setExpanded((prev) => !prev)}
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
                    style: { maxHeight: "30vh", overflowY: "auto" },
                  },
                }}
              >
                {genresLoading && <Loader />}
                {!genresLoading && genres.length === 0 && <NothingFound />}
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <Checkbox
                      checked={
                        filters?.genres && filters?.genres?.indexOf(genre) > -1
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
              }}
            >
              Очистить фильтры
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FiltersBox;
