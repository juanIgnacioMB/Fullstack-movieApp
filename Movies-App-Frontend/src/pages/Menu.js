import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import {Nav,Container,Row} from "react-bootstrap";
import "./Menu.css";

function Menu() {
  const context = useContext(AuthContext);

  const handleClick = () => {
    localStorage.clear();
    context.setLogin(false);
  };

  useEffect(() => {}, [context.login, context.setLogin]);

  return (
    <>
    
      <Nav className="navm">
        <h1>🎞️</h1>
        <Nav.Item>
          <Nav.Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            as={Link}
          >
            🔍 Search
          </Nav.Link>
        </Nav.Item>
        {!localStorage.getItem("token") && (
          <>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="link-1"
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                Sign up
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Sign in
              </Nav.Link>
            </Nav.Item>
          </>
        )}

        {localStorage.getItem("token")  && (
          <>
            <Nav.Item>
              <Nav.Link
                as={Link}
                style={{ color: "white", textDecoration: "none" }}
                to="/"
                onClick={handleClick}
              >
                Log Out
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="link-2"
                to="/favs"
                style={{ color: "white", textDecoration: "none" }}
              >
                Fav. Movies
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
     
    </>
  );
}

export default Menu;
