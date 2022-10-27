import React, { useState ,useEffect} from "react";
import AuthContext from "./AuthContext";

function AuthProvider(props) {
    const {children} = props
  const [favourites, setFavourites] = useState([]);
  const [login,setLogin] = useState(false)
  const [notMovies,setNotMovies] = useState(true)
  const [movies,setMovies] = useState([])
  const [genreId,setGenreId] = useState("")
  
  localStorage.setItem("favs", movies)
 

  const mostrar = () => {
    let set = new Set( favourites.map( JSON.stringify ) )
    let movieList = Array.from( set ).map( JSON.parse );
    setMovies(movieList)
  
  };


  return (
    <AuthContext.Provider
      value={{
        favourites,
        movies,
        notMovies,
        setMovies,
        setFavourites,
        mostrar,
        setLogin,
        login,
        genreId,
        setGenreId
      }}
    >
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
