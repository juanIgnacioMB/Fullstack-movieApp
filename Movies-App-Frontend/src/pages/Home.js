import { useState, useEffect } from "react";
import { MovieList } from "../components/MovieList";
import {
  getMovies,
  getPopulars,
  getByGenre,
} from "../services/ApiService";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./Home.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);

  const context = useContext(AuthContext);

  const searchMovies = async (e) => {
    if (e.key == "Enter") {
      const response = await getMovies(search);
      setSearchTitle(search);
      setLoading(true);
      setMovieByGenre(false);
      setMovies(response.results);
      setLoading(false);
      setError(false);    
      setSearch("");

      if (response.results?.length === 0 || !response.results) {
        setError(true);
      }
  
    }
  };

  const getMoviesByGenre = async () => {
    const response = await getByGenre(context.genreId);
    setMovieByGenre(response.results);
  };
  useEffect(() => {
    context.setDetails(false)
    const getPopularsMovies = async () => {
      try {
        const populars = await getPopulars();
        setPopularMovies(populars.results);
      } catch (e) {
        console.log(e);
      }
    };
    getPopularsMovies();
    getMoviesByGenre();
  }, [ context.genreId]);

  const searching = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Col className="search">
        <input
          type="text"
          onChange={searching}
          className="search-in"
          onKeyDown={searchMovies}
          placeholder=" press enter to search..."
          value={search}
        />
        
        {error && (
        <h1 className="notFound">Movie not found! :(</h1>)}
      </Col>
      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col>
            {loading && (
              <Spinner
                animation="border"
                role="status"
                variant="light"
                style={{ width: "50px", height: "50px" }}
              >
                {" "}
              </Spinner>
            )}
          </Col>
        </Row>
      </Container>

      <Container className="contGenreList">
        <Row style={{ marginTop: "35px" }}>
        {movieByGenre.length == 0 && (
            <>
              <h1 className="title">We recommend you:</h1>
              <MovieList moviesArr={popularMovies} comp="home"/>
            </>
          )}
          {movieByGenre && (
            <>
             <MovieList moviesArr={movieByGenre} comp="home"/>
            </>
          )}

          {!error && !movieByGenre && (
            <>
              <h1 className="title">results of : {searchTitle}</h1>
              <MovieList moviesArr={movies} comp="home"/>
            </>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
