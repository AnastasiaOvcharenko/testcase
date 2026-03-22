import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { getColorByRating } from "../../../../helpers/search-helpers";
import { useLocation, useNavigate } from "react-router";
import type { Movie } from "../../../../types/movies/movies";
import { useContext } from "react";
import { CompareContext } from "../../../../pages/main-page/state/CompareContext";

interface MovieSearchItemProps {
  movie: Movie;
}

export const MovieSearchItem: React.FC<MovieSearchItemProps> = ({ movie }) => {
  const { id, name, alternativeName, rating, poster, year } = movie;
  const navigate = useNavigate();
  const location = useLocation();
  const { addMovie } = useContext(CompareContext);

  const isMainPage = location.pathname === "/";

  return (
    <div onClick={() => navigate(`/movie/${id}`)}>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1,
          gap: 2,
          cursor: "pointer",
        }}
      >
        <Avatar
          src={poster?.url || ""}
          variant="rounded"
          sx={{ width: "10%", minWidth: "30px" }}
          alt={name || alternativeName}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowX: "hidden",
            }}
          >
            <Typography variant="subtitle1" component="div" noWrap>
              {name || alternativeName}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              {rating?.imdb ? (
                <Typography
                  variant="body2"
                  color={getColorByRating(rating.imdb)}
                  sx={{ fontWeight: "bold" }}
                >
                  {rating?.imdb}
                </Typography>
              ) : (
                <></>
              )}
              <Typography variant="body2" color="text.secondary">
                {year}
              </Typography>
            </Box>
          </Box>

          {isMainPage && (
            <Button
              size="small"
              variant="outlined"
              sx={{ flexShrink: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                addMovie(movie);
              }}
            >
              Сравнить
            </Button>
          )}
        </Box>
      </Paper>
    </div>
  );
};
