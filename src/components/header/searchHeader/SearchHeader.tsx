import {
  Box,
  ClickAwayListener,
  List,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import { getMovieBySearch } from "../../../api/search-api/searchApi";
import useDebounce from "../../../hooks/useDebounce";
import Loader from "../../../shared/loader/Loader";
import NothingFound from "../../../shared/nothing-found/NothingFound";

import { MovieSearchItem } from "./movieSearchItem/MovieSearchItem";

import type { Movie } from "../../../types/movies";
import type { AxiosResponse } from "axios";

const SearchBar: React.FC = () => {
  const theme = useTheme();

  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce<string>(input);
  const [loading, setLoading] = useState<boolean>(false);

  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (debouncedInput.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    setShowResults(true);
    setLoading(true);
    getMovieBySearch(debouncedInput)
      .then((result: AxiosResponse) => {
        setResults(result?.data?.docs);
      })
      .catch(() => toast.error("Произошла ошибка при загрузке поиска фильмов"))
      .finally(() => setLoading(false));
  }, [debouncedInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClickAway = function () {
    setShowResults(false);
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <TextField
        ref={inputRef}
        variant="outlined"
        placeholder="Поиск..."
        size="small"
        value={input}
        onChange={handleChange}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          width: "30vw",
        }}
      />
      {showResults && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "60vh",
              overflowY: "auto",
              zIndex: 999,
              borderRadius: "0 0 8px 8px",
              boxShadow: 3,
            }}
          >
            <List disablePadding>
              {results.map((movie) => (
                <MovieSearchItem movie={movie} key={movie.id} />
              ))}
              {loading && <Loader />}
              {!loading && results.length === 0 && <NothingFound />}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchBar;
