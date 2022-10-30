import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/register";
import Menu from "../pages/Menu";
import FavMovies from "../pages/Favs-movies";
import NotFound from "../pages/Not-found";
import Container from "react-bootstrap/Container";
import Login from "../pages/login";

import { MovieDetailsB } from "../pages/MovieDetails";

function Routing() {
  return (
    <BrowserRouter>
     <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favs" element={<FavMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/MovieDetails/:id" element={<MovieDetailsB />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Routing;
