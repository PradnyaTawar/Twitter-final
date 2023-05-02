import "./login.css";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../images/logo.png"
import { useState } from "react";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import axios from "axios";

function SignUp() {
  //setting up use state for fullname ,password and email
  const [fullName, SetFullName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [location, SetLocation] = useState("");
  const [DOB, SetDOB] = useState("");
  //setting up loading animation
  const [loading, SetLoading] = useState(false);
  //signup event
  const signup = (event) => {
    event.preventDefault();
    SetLoading(true);
    const requestData = { fullName: fullName, email, password, location, DOB };
    axios
      .post(`${API_BASE_URL}/signup`, requestData)
      .then((result) => {
        // debugger;
        if (result.status === 201) {
          SetLoading(false);
          Swal.fire({
            icon: "success",
            title: "User signed up successfully",
          });
        }
        SetFullName("");
        SetEmail("");
        SetPassword("");
        SetDOB("");
        SetLocation("");
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
        Swal.fire({
          icon: "error",
          title: "Signup failed , Please try again later",
        });
      });
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="homeContainer">
        <div className="row " >
          <div className=" container-clr col-md-6 col-sm-12 ">
          <FontAwesomeIcon className='cart ' icon={faComments} />
          <div className="cart-name" > Join Us </div>

          </div>
          <div className="col-md-6 col-sm-12 container">
            <Card
              className="p-4 m-1"
              style={{width: "80%", border: "none" }}
            >
              <Form className="homeContainer-form" onSubmit={(e) => signup(e)}>
              <img
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                  src={logo}
                  alt="logo not available"
                ></img>
                <Card.Title>Signup Form </Card.Title>
                <hr></hr>
                    
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control
                    value={fullName}
                    onChange={(ev) => SetFullName(ev.target.value)}
                    type="text"
                    placeholder="Enter your full name"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control
                    value={email}
                    onChange={(ev) => SetEmail(ev.target.value)}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Control
                    value={password}
                    onChange={(ev) => SetPassword(ev.target.value)}
                    type="password"
                    placeholder="Set Password"
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control
                    value={location}
                    onChange={(ev) => SetLocation(ev.target.value)}
                    type="text"
                    placeholder="Location"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control
                    value={DOB}
                    onChange={(ev) => SetDOB(ev.target.value)}
                    type="DOB"
                    placeholder="Date of Birth (Format: DD/MM/YY)"
                  />
                </Form.Group>
                <div className="mt-1 d-grid">
                  <button type="submit" className="custom-btn custom-btn-blue">Sign Up</button>
                </div>
                {/*Adding the loading animation on top of the card  */}
                {loading ? (
                  <div className="row">
                    <div className="col-md-12">
                      {/*Adding spinner code from bootstrap */}
                      <div
                        className="spinner-border text-warning"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              
                <div className="mt-1 mb-2 d-grid">
                  <button
                    className="custom-btn custom-btn-white"
                    style={{ width: "100%" }}
                  >
                    <span className="text-muted fs-6">
                      Already have an account?
                    </span>
                    <Link to="/login" className="ms-1 text-info fw-bold">
                      Log In
                    </Link>
                  </button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
