import { Avatar, Box, Paper, Typography } from "@mui/material";
import { getColorByRating } from "../../../../helpers/search-helpers";
import type { Movie } from "../../../../types/movies/movies";
import { useNavigate } from "react-router";

interface MovieSearchItemProps {
  movie: Movie;
}

export const MovieSearchItem = ({ movie }: MovieSearchItemProps) => {
  const { id, name, alternativeName, rating, poster, year } = movie;
  const navigate = useNavigate();
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
          sx={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
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
      </Paper>
    </div>
  );
};
