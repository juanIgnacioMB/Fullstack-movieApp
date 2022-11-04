import Movies from "./Movies";
import "./movieList.css"
export const MovieList = (props) => {
  const { moviesArr, comp } = props;

  const stringLimit = (value) => {
    if (value.length > 10) {
      return value.slice(0, 6).concat("...");
    } else {
      return value;
    }
  };

  return (
    <>
      {moviesArr?.map((movie) => (
        <Movies
          key={movie.id}
          name={stringLimit(movie.original_title)}
          picture={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
          id={movie.id}
          comp={comp}
        />
      ))}
    </>
  );
};
