import React, { useState, useEffect, useRef } from "react";
import { TextField, Paper, List, Box, ClickAwayListener } from "@mui/material";
import { testData } from "../../../pages/main-page/testData";
import type { Movie } from "../../../types/movies/movies";
import { getMovieBySearch } from "../../../api/search-api/searchApi";
import useDebounce from "../../../hooks/useDebounce";
import { MovieSearchItem } from "./movieSearchItem/MovieSearchItem";

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce<string>(input);
  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (debouncedInput.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    getMovieBySearch(debouncedInput)
      .then((result) => {
        setResults(result?.data?.docs);
        setShowResults(true);
      })
      .catch((err) => console.log(err));
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
          "& fieldset": { borderColor: "gray" },
        }}
        InputProps={{
          style: { paddingRight: 0 },
        }}
      />
      {showResults && results.length > 0 && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              height: "60vh",
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
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchBar;
