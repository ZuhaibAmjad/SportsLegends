import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useEffect } from "react";
  import axios from "axios";
  import { Alert, Slide, Snackbar } from "@mui/material";
  
  
  export default function Register() {
    const [personName, setPersonName] = React.useState([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const [succesAlert, setSuccesAlert] = useState(false);
    const ITEM_HEIGHT = 40;
    const ITEM_PADDING_TOP = 1;
    const navigate = useNavigate();
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
  
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  
    const names = [
      "Advance Payment Custumer",
      "Star Custumer",
      "Total Booking Team",
      "Total Team Viewer",
    ];
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
  
    let name, value;
    const getUserdata = (e) => {
      name = e.target.name;
      value = e.target.value;
      setUser({ ...user, [name]: value });
      console.log(user);
    };
  
    const closeDailog = () => {
      setErrorAlert(false);
    };
  
    const AddUser = async (e) => {
      e.preventDefault();
      const { firstName, lastName, password, email, phone } = user;
  
      let data;
      if (firstName && password && lastName && email && phone) {
        // setLoading(true);
        try {
          const params = new URLSearchParams();
          params.append("firstName", firstName);
          params.append("lastName", lastName);
          params.append("password", password);
          params.append("email", email);
          params.append("phone", phone);
  
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/signup`,
            params,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              withCredentials: true,
            }
          );
          // data = response.data;
          // console.log(data);
          if (response.status === 200) {
            setMsg("User Added SuccesFully")
            navigate("/admin/users");
          }
        } catch (error) {
          if (error.response.status === 400) {
            console.log(error.response.data.message);
            setMsg(error.response.data.message);
            setErrorAlert(true);
            return;
          }
          if (error.response.status === 500) {
            setMsg(error.response.data.message);
            setErrorAlert(true);
            console.log(error);
            return;
          } else {
            setMsg(error.response.data.message);
            setErrorAlert(true);
            console.log(error);
            return;
          }
        }
      } else {
        setMsg("Please Enter All Feilds");
        setErrorAlert(true);
        return;
      }
    };
  
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 992);
  
    useEffect(() => {
      const handleResize = () => {
        setIsWideScreen(window.innerWidth > 992);
      };
  
      window.addEventListener("resize", handleResize);
  
      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    return (
      <div className="block lg:flex xl:flex 2xl:flex h-[100vh]">
        <Snackbar
          open={errorAlert}
          autoHideDuration={3000}
          onClose={closeDailog}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" onClose={closeDailog} sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar>
        <Snackbar
          open={succesAlert}
          autoHideDuration={2000}
          onClose={closeDailog}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={closeDailog} sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar> 
        <div className="w-full overflow-y-scroll h-[100vh]">
          <div className="flex justify-center my-10">
            <div className="border ">
              <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
                Sign Up
              </h1>
              <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3">
                <div className="my-3">
                  <label className="text-sm" for="exampleInputEmail1 ">
                    EMAIL
                  </label>
                  <div class="input-group my-2">
                    <input
                      type="text"
                      name="email"
                      onChange={getUserdata}
                      required
                      class="form-control rounded-0"
                      placeholder="user@eamil.address"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
                <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                  <div className="space-y-2">
                    <label className="text-sm" for="exampleInputEmail1">
                      FIRST NAME
                    </label>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        onChange={getUserdata}
                        required
                        class="form-control rounded-0"
                        placeholder="e.g Sally"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" for="exampleInputEmail1">
                      LAST NAME
                    </label>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        onChange={getUserdata}
                        required
                        class="form-control rounded-0"
                        placeholder="e.g Jones"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                  <div className="space-y-2">
                    <label className="text-sm" for="exampleInputEmail1">
                      TELEPHONE
                    </label>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        onChange={getUserdata}
                        required
                        class="form-control rounded-0"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" for="exampleInputEmail1">
                      Password
                    </label>
                    <div>
                      <input
                        type="password"
                        name="password"
                        class="form-control rounded-0"
                        required
                        onChange={getUserdata}
                        placeholder="password"
                        aria-label="password"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-3 text-sm ml-3">
                  This new user will be sent an invitation email (in accordance
                  with your venue's notification settings).
                </div>
                <div className="flex space-x-3">
                  <button
                    className="border p-2 px-3 text-sm text-white  "
                    style={{ backgroundColor: "#00A176" }}
                    onClick={AddUser}
                  >
                    Add User
                  </button>
                  <Link
                    to="/"
                    className="border p-2 px-3 text-sm hover:bg-gray-200"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  