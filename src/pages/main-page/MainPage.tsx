import { Box } from "@mui/material";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useMovieFilters } from "../../hooks/useMovieFilters";
import { useMovies } from "../../hooks/useMovies";
import FiltersBox from "../../components/filters/Filters";
import Header from "../../components/header/Header";
import MovieList from "../../components/movie-list/MovieList";
import SidebarCompare from "../../components/sidebar-compare/SidebarCompare";
import Loader from "../../shared/loader/Loader";
import NothingFound from "../../shared/nothing-found/NothingFound";
import { CompareProvider } from "./state/CompareProvider";

const MainPage: React.FC = () => {
  const { fetching, setFetching } = useInfiniteScroll();
  const filters = useMovieFilters();
  const { movieList, loading } = useMovies({
    filters,
    shouldFetch: fetching,
    setShouldFetch: setFetching,
  });

  return (
    <CompareProvider>
      <Header />
      <Box display="flex" gap={1} paddingY={2} paddingX={1}>
        <SidebarCompare />
        <Box
          display="flex"
          flexDirection="column"
          overflow="hidden"
          flexGrow={1}
        >
          <FiltersBox />
          <MovieList movieList={movieList} variant="main" />
          {loading && <Loader />}
          {!loading && movieList.length === 0 && <NothingFound />}
        </Box>
      </Box>
    </CompareProvider>
  );
};

export default MainPage;
