import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faApple,
  faMicrosoft,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import Alert from "@mui/material/Alert";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { CircularProgress } from "@mui/material";

export default function Login() {
  console.log(process.env.REACT_APP_BASE_URL)
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const cookies = new Cookies();

  let value, name;

  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    let data;
    if (email && password) {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/login`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
          }
        );
        console.log(response)
        data = response.data;
        console.log(data);
        cookies.set("authorization", data.token);
        cookies.set("userId", data.userId);
        if (response.status === 200) {
          navigate("/admin/booking");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrMsg(
            "Sorry, your login credentials are not correct. Please double-check your email and password. You can use the login-reset feature if you have forgotten your password."
          );
          setLoading(false);
          setError(true);
          console.log(error);
          return;
        }
        if (error.response.status === 500) {
          setErrMsg("Internel Server Error");
          setLoading(false);
          setError(true);
          console.log(error);
          return;
        } else {
          setErrMsg("Please Check your Internet Connection and Try Again");
          setLoading(false);
          setError(true);
          console.log(error);
          return;
        }
      }
    } else {
      setErrMsg("Please Enter Email and Password to Continue");
      setLoading(false);
      setError(true);
      console.log(error);
      return;
    }
  };

  const containerRef = React.useRef(null);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <CircularProgress color="inherit"  />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="shadow-lg p-5 max-w-2xl">
            <h1 className="text-center text-blue-400">
              Log in to <span className="font-bold">Legends Arena </span>
            </h1>
            <div className="row my-3">
              <div className="col-12 form-row align-items-center p-3">
                <div class="col-auto my-3">
                  <label class="sr-only" for="inlineFormInputGroup">
                    Username
                  </label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text rounded-0">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="h-4 p-2"
                        />
                      </div>
                    </div>
                    <input
                      onChange={getUserdata}
                      type="email"
                      name="email"
                      class="form-control rounded-0"
                      id="inlineFormInputGroup"
                      placeholder="your@email.address"
                    />
                  </div>
                </div>
                <div class="col-auto my-3">
                  <label class="sr-only" for="inlineFormInputGroup">
                    Password
                  </label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text rounded-0">
                        {" "}
                        <FontAwesomeIcon
                          className="h-4 p-2"
                          icon={faKey}
                        />{" "}
                      </div>
                    </div>
                    <input
                      onChange={getUserdata}
                      type="password"
                      name="password"
                      class="form-control rounded-0"
                      id="inlineFormInputGroup"
                      placeholder="your password"
                    />
                  </div>
                </div>
                <div>
                  <input onChange={getUserdata} type="checkbox" />
                  <label className="m-2">Remember Me</label>

                  {error ? (
                    <Slide
                      in={error}
                      container={containerRef.current}
                      direction="left"
                      className="my-2 rounded-0"
                    >
                      <Alert severity="error">{errMsg}</Alert>
                    </Slide>
                  ) : null}
                </div>
                <Link
                  onClick={sendData}
                  className="w-full text-white bg-blue-500 p-3 d-block text-center"
                >
                  Log In
                </Link>
                <p className="text-sm text-center my-3">
                  Forgot password or can't login? Reset login now ?
                  <Link to="/resetPass" className="text-blue-400 ml-2">
                    Reset login now
                  </Link>
                </p>
                <p className="text-sm text-center text-blue-400 mt-3">
                  <Link to="/register">How do I register?</Link>
                </p>
              </div>
              {/* <div className="text-center flex p-4 justify-center col-1">
                OR
              </div>
              <div className="col-4 p-3">
                <button className="text-center w-full bg-blue-100 p-2 my-2 hover:bg-blue-600 hover:text-white">
                  <FontAwesomeIcon icon={faFacebookF} className=" " /> Log in
                  With Facebook
                </button>
                <button className="text-center w-full bg-red-100 p-2 my-2 hover:bg-red-600 hover:text-white">
                  <FontAwesomeIcon icon={faGoogle} /> Log in With Google
                </button>
                <button className="text-center w-full bg-gray-100 p-2 my-2 hover:bg-gray-600 hover:text-white">
                  <FontAwesomeIcon icon={faMicrosoft} /> Log in With MicroSoft
                </button>
                <button className="text-center w-full bg-gray-200 p-2 my-2 hover:bg-black hover:text-white">
                  <FontAwesomeIcon icon={faApple} /> Log in With Apple
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
