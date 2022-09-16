export async function getMovies(search){
    
    //return fetch("https://www.omdbapi.com/?s="+search+"&apikey=2df2422f").then(response => response.json())
    return fetch("https://api.themoviedb.org/3/search/movie?api_key=a8684027aadbac0b7af1bab61fcaf3ce&language=es-ES&page=1&include_adult=false&query="+search).then(response => response.json())
    
}

export async function register(){
    
    return fetch("http://localhost:8080/users").then(response => response.json())
    
}

export async function login(emailAndPassword){
    
   return fetch("http://localhost:8080/users",{method: "POST", body:JSON.stringify(emailAndPassword)}).then(response => response.json())
    
}


export async function getMoviesInfo(id){
    
    return fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=a8684027aadbac0b7af1bab61fcaf3ce&language=en-US").then(response => response.json())
    //return fetch("http://www.omdbapi.com/?i="+id+"&apikey=2df2422f").then(response => response.json())
}

export async function getPopulars(){
    return fetch("https://api.themoviedb.org/3/discover/movie?api_key=a8684027aadbac0b7af1bab61fcaf3ce&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate").then(res =>res.json())
}