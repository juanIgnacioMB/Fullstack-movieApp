import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMoviesInfo,getPopulars } from "../services/ApiService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieDetails2.css";
import AuthContext from "../context/AuthContext";
import { Button } from "react-bootstrap";
import Movies from "../components/Movies";

export const MovieDetailsB = () => {
  const [info, setInfo] = useState({});
  const [movieImage, setMovieImage] = useState("");
  const [recomendedMovies, setRecomendedMovies] = useState([])
  const { id } = useParams();

  const context = useContext(AuthContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const getMovie = async () => {
      const response = await getMoviesInfo(id);

      setInfo(response);
      setMovieImage(
        "https://image.tmdb.org/t/p/original/" + response.poster_path
      );
    };
    const getPopularsMovies=async()=>{
      const response = await getPopulars()
      setRecomendedMovies(response.results)
    }
   getPopularsMovies()
    getMovie();
  }, [setInfo]);
  console.log(movieImage);
  const fav = () => {
    context.setFavourites([
      ...context.favourites,
      { name: info?.original_title, id: info?.id, image: "https://image.tmdb.org/t/p/original/" + info.poster_path },
    ]);
    context.mostrar();
  };

  return (
    <div className="detail-cont2">
      <div className="detail-cont3">
        {movieImage !== "https://image.tmdb.org/t/p/original/null" && (
          <img src={movieImage} />
        )}
        {movieImage == "https://image.tmdb.org/t/p/original/null" && (
          <img
            src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
            alt=""
          />
        )}

        <div className="detail-cont4">
          <h1>{info.original_title}</h1>
          <p>{info.overview}</p>
          <h2>genre</h2>
          <div className="genresList">
            {" "}
            {info.genres?.map((genre) => (
              <p>{genre.name}</p>
            ))}
          </div>
          <h2>votes</h2>
          <p>{info.vote_average}</p>
          <h2>release</h2>
          <p>{info.release_date}</p>
          <Button variant="primary" onClick={fav}>
            Add favs
          </Button>
        </div>
      </div>
      <div className="sliderCont">
        <h3>You can also see</h3>
        <Slider {...settings} className="sliderCarr">
          {recomendedMovies.map((movie)=>(
            <Movies name={movie.original_title} picture={ "https://image.tmdb.org/t/p/original/" + movie.poster_path} id={movie.id}/>
          ))}
        </Slider>
      </div>
    </div>
  );
};