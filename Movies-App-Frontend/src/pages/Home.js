import { useState,useEffect } from "react";
import Movies from "../components/Movies";
import { getMovies,getPopulars,getGenres } from "../services/ApiService";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { GenresList } from "../components/Genres";
import "./Home.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("")
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [populars, setPopulars] = useState(true)

const context =useContext(AuthContext)

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
      
      if (response.results?.length === 0 || !response.results) {
        setError(true);
        setPopulars(true)
      }
      if(search == ""){
        setPopulars(true)
      }
    }
  };

  const stringLimit=(value)=>{
    if(value.length > 15){
      return value.slice(0,10).concat("...")
    }else{
      return value
    }
    
  }


  useEffect(()=>{
    console.log(context.genreId)
    const getGenresFunc=async()=>{
      const response = await getGenres()
      setGenres(response.genres)
    }
    const getPopularsMovies = async ()=>{
      try{
        const populars = await getPopulars()
        setPopularMovies(populars.results)
        
      }catch(e){
        console.log(e)
      }
    }
    getPopularsMovies()
    getGenresFunc()
      
  },[populars, context.genreId])

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
      <GenresList genres={genres}/>
      <Container >
        <Row style={{ marginTop: "35px" }}>
         {populars && (
          <>
          <h1 className="title" >We recommend you:</h1>
          
          {popularMovies.map((movie)=>(
            <Movies
            key={movie.id}
            name={stringLimit(movie.title)}
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
            name={stringLimit(movie.original_title)}
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