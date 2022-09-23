import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/register";
import Menu from "../pages/Menu";
import FavMovies from "../pages/Favs-movies";
import NotFound from "../pages/Not-found";
import MovieDetails from "../pages/Movie-details";
import Container from "react-bootstrap/Container";
import Login from "../pages/login";

function Routing() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favs" element={<FavMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Routing;
