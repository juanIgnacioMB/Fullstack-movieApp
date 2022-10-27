import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export const GenresList = (props) => {
  const context = useContext(AuthContext);
  const { genres } = props;
  const handleClick = (e) => {
    context.setGenreId(e.target.value);
  };
  return (
    <div>
    <h3>Filtrar por genero</h3>
      <ul>
        {genres?.map((genre) => (
          <li>
            {" "}
            <button value={genre?.id} onClick={handleClick}>
              {genre?.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
