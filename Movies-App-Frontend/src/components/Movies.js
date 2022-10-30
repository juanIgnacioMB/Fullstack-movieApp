import { useState, useEffect, useContext } from "react";
import { getMoviesInfo } from "../services/ApiService";
import AuthContext from "../context/AuthContext";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./movies.css";

function Movies(props) {
  const { name, picture, id, searching, comp, popular } = props;

  const context = useContext(AuthContext);

  const [details, setdetails] = useState(false);
  const [info, setInfo] = useState();
  const [search, setSearch] = useState();
  const [error, setError] = useState(false);

  const showDetailsButton = () => {
    if (details === true) {
      setdetails(false);
    } else {
      setdetails(true);
      console.log(popular, name, details);
    }
  };

  useEffect(() => {
    const infoResponse = async () => {
      try {
        const response = await getMoviesInfo(id);
        setInfo(response);
        setSearch(searching);
        console.log(picture)
      } catch (e) {
        setError(true);
      }
    };
    infoResponse();
  }, [searching, context.movies]);

  const fav = () => {
    context.setFavourites([
      ...context.favourites,
      { name: name, id: id, image: picture },
    ]);
    context.mostrar();
  };
  const removeFav = () => {
    context.setMovies((datos) =>
      datos.filter((movie) => {
        return movie.id !== id;
      })
    );
    context.setFavourites((favourites) =>
      favourites.filter((movie) => {
        return movie.id !== id;
      })
    );
  };
  return (
    <>
      <Col className="colm">
        <div className="pan">
          <Card className="cardc" bg="dark">
            {picture == "https://image.tmdb.org/t/p/original/null" && (
              <Card.Img
                variant="top"
                src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                className="imgm"
              />
            )}
            {picture !== "https://image.tmdb.org/t/p/original/null" && (
              <Card.Img variant="top" src={picture} className="imgm" />
            )}

            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>

              {comp === "home" && (
                <div>
                  {localStorage.getItem("token") && (
                    <Button variant="primary" onClick={fav}>
                      Favs
                    </Button>
                  )}
                  <Link to={"/MovieDetails/" + info?.id}>
                    <Button
                      variant="primary"
                      onClick={showDetailsButton}
                      style={{ marginLeft: "15px" }}
                    >
                      See more
                    </Button>
                  </Link>
                </div>
              )}
              {comp === "favs" && (
                <div className="cont-button">
                  <Button variant="primary" onClick={removeFav}>
                    remove
                  </Button>
                  <Link to={"/MovieDetails/" + info?.id}>
                    <Button
                      variant="primary"
                      onClick={showDetailsButton}
                      style={{ marginLeft: "15px" }}
                    >
                      See more
                    </Button>
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Col>
    </>
  );
}

export default Movies;
