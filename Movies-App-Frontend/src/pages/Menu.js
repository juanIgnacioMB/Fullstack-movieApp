import { useContext, useEffect,useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import {Nav} from "react-bootstrap";
import { GenresList } from "../components/Genres";
import { getGenres } from "../services/ApiService";
import "./Menu.css";



function Menu() {
  const context = useContext(AuthContext);
  const [genres,setGenres] = useState([])
  const handleClick = () => {
    localStorage.clear();
    context.setLogin(false);
  };

  useEffect((
    
  ) => {
    const getGenresMov = async()=>{
      const response = await getGenres()
      setGenres(response.genres)
        }
        getGenresMov()
  }, [context.login, context.setLogin]);

  return (
    <div className="header">
    
      <Nav className="nav2">
        <h1>🎞️</h1>
        <ul>
        <Nav.Item>
          <Nav.Link
            to="/"
          
            as={Link}
          >
           <li>  🔍 Search</li> 
          </Nav.Link>
        </Nav.Item>
        {!localStorage.getItem("token") && (
          <>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="link-1"
                to="/register"
                
              >
               <li> Sign up</li>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/login"
                
              >
                <li> Sign in</li> 
              </Nav.Link>
            </Nav.Item>
            <GenresList genres={genres}/>
            </>
           
            
        )}
        
        {localStorage.getItem("token")  && (
          <>
            <Nav.Item>
              <Nav.Link
                as={Link}
                
                to="/"
                onClick={handleClick}
              >
               <li>  Log Out</li> 
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="link-2"
                to="/favs"
                
              >
                <li> Fav. Movies</li> 
              </Nav.Link>
             
            </Nav.Item>
            <GenresList genres={genres}/>
          </>
        )}
        </ul> 
      </Nav>
     
    </div>
  );
}

export default Menu;
