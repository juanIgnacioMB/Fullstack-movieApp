import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import "./genres.css"

export const GenresList = (props) => {
  const context = useContext(AuthContext);
  const { genres ,getMovies} = props;
  const handleClick = (event) => {
    context.setGenreId(event.target.value);
  };
  return (
    <div className="GenreNav">
   
      <ul>
          <select name="" id=""  onChange={event => {
    handleClick(event);
    getMovies();
  }}>
    <option value="">Movies by genre</option>
          {genres?.map((genre) => (
            
            <option value={genre?.id} key={genre.id}>
              {genre?.name}
              
            </option>
            
        ))}
        </select>
      </ul>
    </div>
  );
};
