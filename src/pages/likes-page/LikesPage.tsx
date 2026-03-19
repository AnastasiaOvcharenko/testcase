import Header from "../../components/header/Header";
import MovieList from "../../components/movie-list/MovieList";
import type { MovieFullInfo } from "../../types/movies/movies";

const LikesPage = () => {
  const favoritesString = localStorage.getItem("favoriteMovies");
  const favoriteMovies: MovieFullInfo[] = favoritesString
    ? JSON.parse(favoritesString)
    : [];

  return (
    <>
      <Header />
      <div>
        <MovieList movieList={favoriteMovies} />
      </div>
    </>
  );
};

export default LikesPage;
