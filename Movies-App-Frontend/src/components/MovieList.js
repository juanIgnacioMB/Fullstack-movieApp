import Movies from "./Movies";
export const MovieList = (props) => {
  const { moviesArr,comp } = props;
  
  const stringLimit = (value) => {
    if (value.length > 15) {
      return value.slice(0, 10).concat("...");
    } else {
      return value;
    }
  };
return(
    <>
  {moviesArr?.map((movie)=>(
    <Movies name={stringLimit(movie.original_title)} picture={"https://image.tmdb.org/t/p/original/" +movie.poster_path} id={movie.id} comp={comp}/>
  ))}
  </>
)
};
