import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { register } from "../services/ApiService";
import swal from "sweetalert";
import AuthContext from "../context/AuthContext";

function Register(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const onSubmit = (data) => {
    let comp = /\S+@\S+\.\S+/
    if(comp.test(data.email) == false){
      swal("Invalid Email", "", "error");
      
     } 
     else if(data.password === data.password2){
    
      fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message == "you sign-up correctly") {
            swal(res.message, "", "success");
            
            fetch("http://localhost:8080/users/login",{
              method:"POST",
              headers:{"content-type": "application/json"},
            body:JSON.stringify(data)}
            ).then((res) => res.json())
              .then(token => {
                console.log(token)
                context.setLogin(true);
                localStorage.setItem("token", token);

              })
            navigate("/");
          } else {
            swal(res, "", "error");
            
          }
        });
   
   }else{
    swal("Please make sure yours passwords match", "", "error");
   }

   
   
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col style={{ marginTop: "15vh" }}>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              style={{ color: "white", width: "500px" }}
              id="formreg"
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />
                
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassoword">
                <Form.Label>password</Form.Label>
                <Form.Control
                  placeholder="Enter password"
                  type="password"
                  {...register("password")}
                />
               
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassoword2">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  {...register("password2")}
                />
                
              </Form.Group>

              <Button variant="primary" type="submit" form="formreg">
                Sign up
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;


