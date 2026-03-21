import { Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./pages/main-page/MainPage";
import LikesPage from "./pages/likes-page/LikesPage";
import MoviePage from "./pages/movie-page/MoviePage";
import ErrorPage from "./pages/error-page/ErrorPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
