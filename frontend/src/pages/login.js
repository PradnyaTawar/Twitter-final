import "./login.css";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import loginlogo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../images/logo.png"

function Login() {
  //setting up use state for password and email
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  //setting up loading animation
  const [loading, SetLoading] = useState(false);
  //declaring Dispatch
  const dispatch = useDispatch();
  //declaring Navigation
  const navigate = useNavigate();
  //login event
  const login = (event) => {
    event.preventDefault();

    SetLoading(true);
    const requestData = { email, password };
    axios
      .post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {
        if (result.status === 200) {
          SetLoading(false);
          /*Swal.fire({
             icon: "success",
             title: "User signed up successfully",
           });*/
          //here we are creating a local storage for user data
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem("user", JSON.stringify(result.data.result.user));
          //dispatching the data to the redux store here
          dispatch({ type: "LOGIN_SUCCESS", payload: result.data.result.user });
          //swal start
          let timerInterval;
          Swal.fire({
            icon: "success",
            title: "Logging you in..... ",

            html: `<img width="200" height="200" src="https://64.media.tumblr.com/b3cf5f8015070eb40eb3e0f57b476d2f/tumblr_p9x0xoVGC11rf19p4o1_640.gifv" alt="not available"/>`,

            timer: 2500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              //const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                // b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
          //swal end
          SetLoading(false);
          navigate("/home");
        }

        /* SetEmail("");
         SetPassword("");*/
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.error,
        });
      });
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <div  className="homeContainer ">
        <div className="row">
          <div className=" container-clr col-md-6 col-sm-12  ">
          <FontAwesomeIcon className='cart ' icon={faComments} />
          <div className="cart-name" > Welcome Back </div>
          </div>
          <div className=" col-md-6 col-sm-12 card-title text-center mt-3 ">
            <Card
              className="p-4  m-1 "
              style={{ width: "80%", border: "none" }}
            >
              <Form  className="homeContainer-form" onSubmit={(e) => login(e)}>
              <img
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                  src={logo}
                  alt="logo not available"
                ></img>
                <Card.Title>Login </Card.Title>
                <hr></hr>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    value={email}
                    onChange={(ev) => SetEmail(ev.target.value)}
                    type="email"
                    placeholder="Enter your email address"
                  />

                </Form.Group>

                <Form.Group className="mb-3 " controlId="formBasicPassword">
                  <Form.Control
                    value={password}
                    onChange={(ev) => SetPassword(ev.target.value)}
                    type="password"
                    placeholder=" Enter your password"
                  />
                </Form.Group>

                <div className="mt-3 d-grid">
                  <button type="submit" className="custom-btn custom-btn-blue">Log In</button>
                </div>
                {/*Loading animation on top of the card  */}
                {loading ? (
                  <div className="row">
                    <div className="col-md-12">

                      <div
                        className="spinner-border"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className=" my-2">
                  <hr className="text-muted" />
                  <h5 className="text-muted text-center">OR</h5>
                  <hr className="text-muted" />
                </div>
                <div className="mt-3 mb-4 d-grid">
                  <button type="submit" className="custom-btn custom-btn-white">
                    <span className="text-muted">Don't an have account ?</span>
                    <Link to="/signup" className="ms-1  text-info fw-bold">Sign Up</Link>
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
export default Login;
