import React, { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider(props) {
    const {children} = props
  const [favourites, setFavourites] = useState([]);
  const [login,setLogin] = useState(false)
  const [notMovies,setNotMovies] = useState(true)
  const [movies,setMovies] = useState([])
  const [genreId,setGenreId] = useState("0")
  const [details,setDetails] = useState(false)
  
  localStorage.setItem("favs", movies)
 

  const Filter = () => {
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
        Filter,
        setLogin,
        login,
        genreId,
        setGenreId,
        details,
        setDetails
      }}
    >
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
