import { useState,useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button , Container,Row,Col, Alert} from "react-bootstrap";
import { login } from "../services/ApiService";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import swal from 'sweetalert';

function Login(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("")
  /*
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };*/

  /*
  const onSubmit = (e) => {
    

    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(form)
    }).then((response) => response.json()).then(res => {
        localStorage.setItem("token", res)
        if(localStorage.getItem("token").length > 15){
            context.setLogin(true)
          
            navigate("/")
            
        }
      
    })
    console.log(context.login)*/
  
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
        console.log(res);
        localStorage.setItem("token", res);

        if (localStorage.getItem("token").length > 40) {
          context.setLogin(true);
            swal("you sign-in correctly","","success")
          navigate("/");
  }else{
    setError(res.message)

}});
  

    
  };

 
  //const response = await login(data);
  //console.log(response);

  return (
    <>
    <Container>
        <Row>
            <Col></Col>
            <Col style={{marginTop:"15vh"}}>
      <Form
      id="formName"
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
          
           type="password" {...register("password", {required:true})} />
          {error != "" && <Alert  variant={"danger"} style={{marginTop:"10px"}}>
         the user or password is incorrect, please try again

        </Alert>}
        </Form.Group>

        <Button variant="primary" type="submit" form="formName">
          Submit
        </Button>
      </Form>
      </Col>
      <Col></Col>
      </Row>
      </Container>
    </>
  );
}

export default Login;
