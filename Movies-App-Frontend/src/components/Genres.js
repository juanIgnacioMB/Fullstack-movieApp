import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import "./genres.css"

export const GenresList = (props) => {
  const context = useContext(AuthContext);
  const { genres ,getMovies} = props;
  const handleClick = (event) => {
    context.setGenreId(event.target.value);
    console.log(event.target.value)
  };
  return (
    <div className="GenreNav">
    <div className="genreTitle"><h3>Filter by gender</h3></div>
      <ul>
          <select name="" id=""  onChange={event => {
    handleClick(event);
    getMovies();
  }}>
          {genres?.map((genre) => (
            <option value={genre?.id}>
              {genre?.name}
            </option>
        ))}
        </select>
      </ul>
    </div>
  );
};
