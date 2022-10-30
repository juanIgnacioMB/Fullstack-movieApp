import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { getMoviesInfo } from "../services/ApiService"
import "./MovieDetails2.css"

export const MovieDetailsB=()=>{
const [info,setInfo] = useState({})
const [movieImage,setMovieImage] =useState("")
const {id} = useParams()
console.log(id)

useEffect(()=>{
    
    const getMovie =async()=>{
        const response = await getMoviesInfo(id)
        
        setInfo(response)
        setMovieImage("https://image.tmdb.org/t/p/original/"+response.poster_path)
    }
    console.log(info.poster_path)
   
    getMovie()
},[setInfo])

    return(
        <div className="detail-cont2">
          {movieImage !== "https://image.tmdb.org/t/p/original/null" && <img src={movieImage} />}
          {movieImage== "https://image.tmdb.org/t/p/original/null" && (
            <img
              src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
              alt=""
            />
          )}

          <div className="detail-cont3">
            <h1>{info.original_title}</h1>
            <p>{info.overview}</p>
            <h2>genre</h2>
            <div className="genresList"> {info.genres?.map((genre)=>(<p>{genre.name}</p>))}</div>
            <h2>votes</h2>
            <p>{info.vote_average}</p>
            <h2>release</h2>
            <p>{info.release_date}</p>
            
          </div>
          
        </div>
    )
}