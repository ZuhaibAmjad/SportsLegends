import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Alert, Slide, Snackbar, } from "@mui/material";
import axios from "axios";
import { QueueIcon} from "@mui/icons-material"

export default function AddSpaces() {
  const [open, setOpen] = useState(false);
  const [AddSpace, setAddSpace] = useState(false);
  const cancelButtonRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [deleteOption, setDeleteOption] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);

  // const spaces = [
  //   { resourceId: 1, resourcePrice: 3000, name: "Padel Court 1" },
  //   { resourceId: 2, resourcePrice: 3500, name: "Padel Court 2" },
  //   { resourceId: 3, resourcePrice: 3000, name: "Padel Court 3" },
  //   { resourceId: 4, resourcePrice: 3000, name: "Padel Court 4" },
  //   { resourceId: 5, resourcePrice: 3000, name: "Padel Court 5" },
  //   {
  //     resourceId: 6,
  //     resourcePrice: 3000,
  //     name: "Cricket ( 9-aside )",
  //   },
  //   {
  //     resourceId: 7,
  //     resourcePrice: 2000,
  //     name: "Cricket ( 7-aside )",
  //   },
  // ];

  const [spaces, setSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const closeDailog = () => {
    setNewSpace("");
    setOpen(false);
    setAddSpace(false);
    setErrorAlert(false);
  };

  const verify = (e) => {
    let value = e.target.value.trim();
    setDeleteValue(value);
    if (value.length > 0) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  const Add = async (e) => {
    console.log("Clicked");
    e.preventDefault();
    let data;
    if (newSpace.trim() !== "") {
      console.log("Enter");
      // setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("name", newSpace);

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/space/add`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        data = response.data;
        console.log(data);
        if (response.status === 201) {
          closeDailog();
          setMsg("New Space is Added Succesfully");
          setSuccesAlert(true);
        }
      } catch (error) {
        if (error.response.status === 401) {
          // setErrMsg(
          //   "Sorry, your login credentials are not correct. Please double-check your email and password. You can use the login-reset feature if you have forgotten your password."
          // );
          // setLoading(false);
          // setError(true);
          console.log(error);
          return;
        }
        if (error.response.status === 500) {
          setMsg("Please Check your Internet Connection and Try Again");
          setErrorAlert(true);
          console.log(error);
          return;
        } else {
          setMsg("Please Check your Internet Connection and Try Again");
          setErrorAlert(true);
          console.log(error);
          return;
        }
      }
    } else {
      // setErrMsg("Please Enter Name to Continue");
      // setLoading(false);
      // setError(true);
      console.log("error");
      return;
    }
  };

  const DeleteSpace = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/space/${selectedSpace._id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        const updatedSpaces = spaces.filter(
          (space) => space._id !== selectedSpace._id
        );
        setSpaces(updatedSpaces);
        setMsg(" Space is Deleted Succesfully");
        setSuccesAlert(true);
      } else if (response.status === 404) {
        setMsg("Space Not Found");
        setErrorAlert(true);
      } else if (response.status === 400) {
        setMsg("Invalid Space Id");
        setErrorAlert(true);
      } else {
        setMsg("Check Your Internet Connection and try again");
        setErrorAlert(true);
      }
    } catch (error) {
      setMsg("Failed to delete space");
      setErrorAlert(true);
    }
  };

  const getSpaces = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/space/list`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setSpaces(response.data);
        setSelectedSpace(spaces[0]);
      }
    } catch (error) {
      alert("An error occurred while fetching spaces");
    }
  };

  const containerRef = React.useRef(null);

  useEffect(() => {
    console.log(selectedSpace);
  }, [selectedSpace]);

  useEffect(() => {
    getSpaces();
    console.log(newSpace);
  }, [newSpace]);

  return (
    <div>
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={closeDailog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 max-w-5xl">
                  <div className="">
                    <div className=" bg-white w-full">
                      <div className="w-full ">
                        <div className="">
                          <div className="border">
                            <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
                              NEW BOOKING
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={AddSpace} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
          onClose={closeDailog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full"
              style={{ width: "50%", height: "50vh" }}
            >
              <div className="h-100">
                <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
                  ADD SPACES
                </h1>
                <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 ">
                  <p>SPACE NAMES (ONE PER LINE)</p>
                  <textarea
                    type="text"
                    onChange={(e) => setNewSpace(e.target.value)}
                    className="p-3 my-2 border-slate-500 rounded-1"
                    placeholder="Room 101
                  Court 1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={Add}
                      className="px-3 py-2 bg-green-400 hover:bg-green-700 text-white text-lg rounded-1 "
                    >
                    Add Space
                    </button>
                    <button
                      className="px-3 py-2 border-gray-300 hover:bg-slate-100 rounded-1"
                      onClick={closeDailog}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">SPACES</h3>
        <p className="text-md text-gray-400 my-3">
          Your spaces are your core bookable resources. Select a space to edit
          it, or reposition them with drag and drop.
        </p>
        <button className="px-3 py-2 bg-green-400 hover:bg-green-700 text-white text-lg rounded-1 " onClick={() => setAddSpace(true)}>
          Add Spaces
        </button>
      </div>
      <div className="flex flex-wrap w-100">
        <div className="w-full md:w-1/3 md:flex-none pr-3">
          <div className="border p-3 rounded-1">
            {spaces.map((space) => (
              <button
                className={` ${selectedSpace?._id === space._id
                    ? "bg-gray-300 rounded-1"
                    : "hover:bg-gray-200 rounded-1"
                  } w-100 p-2 text-start mb-1`}
                onClick={() => setSelectedSpace(space)}
              >
                {space.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 md:flex-grow bg-white border border-gray-300 rounded-1">
          <div className="flex grid lg:grid-cols-2 md:grid-cols-1 mt-2 p-3 gap-x-3 ">
            <div className="space-y-2">
              <label className="text-sm" for="exampleInputEmail1">
                NAME
              </label>
              <div>
                <input
                  type="text"
                  class="form-control rounded-1"
                  placeholder="Name"
                  value={selectedSpace && selectedSpace.name}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm" for="exampleInputEmail1">
                VISIBILITY
              </label>
              <div>
                <input
                  type="radio"
                  class="mr-2"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                All users can see the space
              </div>
              <div>
                <input
                  type="radio"
                  class="mr-2 h-full"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                Only users with any of these tags can see the space:
              </div>
            </div>
          </div>
          <div className="p-3 ">
            <label className="text-sm" for="exampleInputEmail1">
              Description
            </label>
            <div>
              <textarea className="w-full border p-2 rounded-1" rows="4" cols="50" />
            </div>
          </div>
          <div className="p-3 ">
            <label className="text-sm" for="exampleInputEmail1">
              Delete Space
            </label>
            <div>
              <button
                className="p-2 border my-2 bg-green-400 hover:bg-green-700 hover:text-white rounded-1 "
                onClick={() => setDeleteOption(!deleteOption)}
              >
                {" "}
                {deleteOption ? "Hide delete option" : "Show delete option"}
              </button>{" "}
            </div>
            {deleteOption ? (
              <>
                <Slide
                  in={deleteOption}
                  container={containerRef.current}
                  direction="left"
                  className="my-2"
                >
                  <Alert severity="error">
                    Careful! This is an irreversible action. If you delete this
                    space, all bookings for it will likewise be deleted!
                    Consider exporting your data from the scheduler list mode
                    first. To continue, type Permanently delete Test 1 with
                    bookings below.
                  </Alert>
                </Slide>

                <textarea
                  className="w-full border p-2 rounded-1"
                  onChange={verify}
                  rows="4"
                  cols="50"
                  placeholder={`Type Permanently delete ${selectedSpace.name} with bookings`}
                />
                {details && (
                  <div className="bg-blue-100 border-blue-300 mt-2 space-y-3 p-2">
                    <p>Please enter the correct confirmation!</p>
                    <div className="flex">
                      <p style={{ width: "30%" }}>You entered :</p>
                      <p className="ml-2" style={{ width: "70%" }}>
                        {deleteValue}
                      </p>
                    </div>
                    <div className="flex">
                      <p style={{ width: "30%" }}>You must enter :</p>
                      <p
                        className="ml-2"
                        style={{ width: "70%" }}
                      >{`Permanently delete ${selectedSpace.name} with bookings`}</p>
                    </div>
                  </div>
                )}

                <button
                  className={`p-2 border mt-4 hover:bg-green-400 rounded-1 ${deleteValue ===
                      `Permanently delete ${selectedSpace.name} with bookings`
                      ? "hover:bg-gray-300"
                      : ""
                    }`}
                  disabled={
                    deleteValue !==
                    `Permanently delete ${selectedSpace.name} with bookings`
                  }
                  onClick={DeleteSpace}
                >
                  Delete Space
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
