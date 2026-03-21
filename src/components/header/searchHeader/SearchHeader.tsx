import React, { useState, useEffect, useRef } from "react";
import { TextField, Paper, List, Box, ClickAwayListener } from "@mui/material";
// import { testData } from "../../../pages/main-page/testData";
import type { Movie } from "../../../types/movies/movies";
import { getMovieBySearch } from "../../../api/search-api/searchApi";
import useDebounce from "../../../hooks/useDebounce";
import { MovieSearchItem } from "./movieSearchItem/MovieSearchItem";
import { toast } from "react-toastify";
import type { AxiosError, AxiosResponse } from "axios";
import NothingFound from "../../../shared/nothing-found/NothingFound";
import Loader from "../../../shared/loader/Loader";

const SearchBar: React.FC = () => {
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
      .catch((error: AxiosError) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [debouncedInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClickAway = function () {
    setShowResults(false);
    console.log("away");
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
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 1,
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
