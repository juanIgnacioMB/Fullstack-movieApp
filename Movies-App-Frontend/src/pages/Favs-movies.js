import { useState, useEffect, useContext } from "react";
import MovieDetails from "./Movie-details";
import { getMoviesInfo } from "../services/ApiService";
import AuthContext from "../context/AuthContext";
import Movies from "../components/Movies";
import {  Row } from "react-bootstrap";
import {  useNavigate} from "react-router-dom"


function FavMovies() {
  const context = useContext(AuthContext);
  const [noFavs, setNoFavs] = useState(false);

  useEffect(() => {
    
    context.mostrar();
    if (context.movies.length == 0) {
      setNoFavs(true);
    } else {
      setNoFavs(false);
    }
    
  }, [context.setMovies]);

  

  return (
    <>
      <Row style={{ marginTop: "35px" }}>
        {noFavs && <h1 style={{ color: "white", textAlign: "center" }}>no favorites movies yet</h1>}

        {context.movies?.map((dat, i) => (
          <Movies
            key={i}
            name={context.movies[i].name}
            picture={context.movies[i].image}
            id={context.movies[i].id}
            comp="favs"
          />
        ))}
      </Row>
    </>
  );
}

export default FavMovies;
