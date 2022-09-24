import { useState, useEffect } from "react";
import "./Movie-detail.css";
import { getMoviesInfo } from "../services/ApiService";
import { Container, Card, Row, Col } from "react-bootstrap";

function MovieDetails(props) {
  const { details, showDetails, title, image, plot, release, votes, genre } =
    props;

  return details ? (
    <>
    
      <div className="detail-cont2"></div>
        <div className="detail-cont2">
          {image !== "https://image.tmdb.org/t/p/original/null" && <img src={image} />}
          {image == "https://image.tmdb.org/t/p/original/null" && (
            <img
              src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
              alt=""
            />
          )}

          <div className="detail-cont3">
            {" "}
            <h1>{title}</h1>
            <p>{plot}</p>
            <h2>genre</h2>
            <p>{genre}</p>
            <h2>votes</h2>
            <p>{votes}</p>
            <h2>release</h2>
            <p>{release}</p>
            
          </div>
          
        </div>
        
        <button className="close-btn" onClick={showDetails}>
          X
        </button>
        
      
    </>
  ) : (
    ""
  );
}

/*

<button className="close-btn" onClick={showDetails}>
          X
        </button>

      
      
      
      
      
      
      
      <div className="detail-cont">
<div className="detail-cont2">
<Card style={{ width: '18rem',backgroundColor: "rgba(154,154,154, 0.4)" }} >
      <Card.Img variant="top" src={image} style={{ width: '18rem' ,}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {plot}
        </Card.Text>
        <Button variant="primary"onClick={showDetails} >X</Button>
      </Card.Body>
    </Card>
    </div>
    </div>*/

export default MovieDetails;
