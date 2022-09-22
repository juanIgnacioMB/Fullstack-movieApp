import { useState,useEffect } from "react";
import Movies from "../components/Movies";
import { getMovies,getPopulars } from "../services/ApiService";
import MovieDetails from "./Movie-details";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";


import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("")
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([])
  const [populars, setPopulars] = useState(true)

  const searchMovies = async (e) => {
    if (e.key == "Enter") {
      setSearchTitle(search)
      setLoading(true);
      const response = await getMovies(search);
      setMovies(response.results);
      setLoading(false);
      setError(false);
      setPopulars(false)
      setSearch("");
      console.log(response.results)
      if (response.results?.length === 0 || !response.results) {
        setError(true);
        setPopulars(true)
      }
      if(search == ""){
        setPopulars(true)
      }
    }
  };


  useEffect(()=>{
    
    const getPopularsMovies = async ()=>{
      try{
        const populars = await getPopulars()
        setPopularMovies(populars.results)
        
      }catch(e){
        console.log(e)
      }
    }
    getPopularsMovies()
      
  },[populars])

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
    

        {error && 
       <h1 className="notFound">Movie not found! :(</h1>}
      </Col>
     

      <br/>
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
      <Container >
        <Row style={{ marginTop: "35px" }}>
         {populars && (
          <>
          <h1 className="title" >We recommend you:</h1>
          
          {popularMovies.map((movie)=>(
            <Movies
            key={movie.id}
            name={movie.title.substring(0, 20)}
            picture={"https://image.tmdb.org/t/p/original/"+movie.poster_path}
            id={movie.id}
            comp="home"
            />
          )
          )}
          
          </>)}
          {(!populars && !error )&& (
            <h1 className="title" >results of : {searchTitle}</h1>
          )}
          {movies?.map((movie) => (
            <Movies
            key={movie.id}
            name={movie.original_title.substring(0, 20)}
            picture={"https://image.tmdb.org/t/p/original/"+movie.poster_path}
            id={movie.id}
            comp="home"
            />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
