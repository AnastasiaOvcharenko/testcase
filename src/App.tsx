import { Route, Routes } from "react-router";

import "./App.css";
import { ToastContainer } from "react-toastify";

import PaletteProvider from "./components/palette-provider/PaletteProvider";
import ErrorPage from "./pages/error-page/ErrorPage";
import LikesPage from "./pages/likes-page/LikesPage";
import MainPage from "./pages/main-page/MainPage";
import MoviePage from "./pages/movie-page/MoviePage";



function App() {
  return (
    <>
      <PaletteProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </PaletteProvider>
    </>
  );
}

export default App;
