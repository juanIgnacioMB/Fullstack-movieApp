import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Movies from "../components/Movies";
import {  Row } from "react-bootstrap";
import {  useNavigate} from "react-router-dom"
import swal from "sweetalert";

function FavMovies() {
  const context = useContext(AuthContext);
  const Navigate = useNavigate()
  

  useEffect(() => {
    if(!localStorage.getItem("token")){
   swal("You must login to see favourites movies","","error")
      Navigate("/")
    }
    context.Filter();
  
    
  }, [context.setMovies]);

  

  return (
    <>
      <Row style={{ marginTop: "35px", height:"100%"}}>
        {context.movies.length==0 && <h1 style={{ color: "white", textAlign: "center" }}>no favorites movies yet</h1>}

        {context.movies?.map((mov,i) => (
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
