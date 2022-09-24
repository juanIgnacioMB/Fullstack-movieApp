import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import swal from "sweetalert";

function Login(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onSubmit = (data) => {
    
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          context.setLogin(true);
          swal("you sign-in correctly", "", "success");
          navigate("/");
        } else {
          setError(res.message);
        }
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col style={{ marginTop: "15vh" }}>
            <Form
            id="formName"
              className="form"
              onSubmit={handleSubmit(onSubmit)}
              style={{ color: "white", width: "500px" }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassoword">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                 
                  {...register("password", { required: true })}
                />

                {error != "" && (
                  <Alert variant={"danger"} style={{ marginTop: "10px" }}>
                    the user or password is incorrect, please try again
                  </Alert>
                )}
              </Form.Group>

              <button type="submit" form="formName" className="log-btn">
                Login
              </button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
