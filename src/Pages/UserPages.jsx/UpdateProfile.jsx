import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faCircleUser,
  faSquareRss,
} from "@fortawesome/free-solid-svg-icons";
import UserSideBar from "../../Components/UserSideBar";
import Navbar from "../../Components/Navbar";

export default function UpdateProfile() {
  const [Show, setShow] = useState(true);

  const handleShowComponent1 = () => {
    setShow(true);
  };

  const handleShowComponent2 = () => {
    setShow(false);
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
    <>
      {/* <div className="flex"> */}
        {/* <div className="p-0 position-fixed top-0 start-0">
          <UserSideBar  />
        </div> */}
          <div className="block lg:flex xl:flex 2xl:flex h-[100vh]">
    {isWideScreen ? (
      <UserSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
    ) : (
      <Navbar className="" />
    )}
        <div className="w-100 px-4 h-[100vh] overflow-y-scroll">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-3 m-2 mt-2 p-3">
            <div className="">
              <div className="p-2">
                <p className="text-xl font-semibold">
                  <FontAwesomeIcon icon={faCircleUser} className="mr-3 " />
                  MY PROFILE
                </p>
              </div>
              <button className={`flex p-3 space-x-3  w-100  ${Show ? 'bg-gray-300' : ''}`} onClick={handleShowComponent1}>
                <div className="">
                  <FontAwesomeIcon icon={faPencil} className="h-6" />
                </div>
                <div className="">
                  <h3 className="text-blue-500 font-semibold mb-1 text-start">
                    Personal Calender Feed
                  </h3>
                  <p className="text-sm">An Ical link to use in your other calender </p>
                </div>
              </button>
              <button className={`flex p-3 space-x-3  w-100  ${Show ? '' : 'bg-gray-300'}`} onClick={handleShowComponent2}>
                <div className="">
                  <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                </div>
                <div className="">
                  <h3 className="text-blue-500 font-semibold mb-1 text-start" >
                    Personal Details
                  </h3>
                  <p className="text-sm">Manage your User Account Setting</p>
                </div>
              </button>
            </div>
            {Show ? (
              <div className="lg:col-span-2 md:col-span-1 max-w-xl sm:mt-4 xs:mt-4">
                <div className="">
                  <h3 className="text-lg font-semibold">LOGIN</h3>
                  <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-3 m-2 mt-2">
                    <div className="my-3">
                      <label for="exampleInputEmail1 ">EMAIL</label>
                      <div class="input-group my-2">
                        <input
                          type="text"
                          class="form-control rounded-0"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary rounded-0"
                            type="button"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="my-3">
                      <label for="exampleInputEmail1">PASSWORD</label>
                      <div>
                        <select
                          className="input-field w-100 p-2 my-2 border bg-white"
                          name="nature"
                          aria-label=".form-select-lg example"
                        >
                          <option value="National Highway">
                            National Highway
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="my-3">
                      <label for="exampleInputEmail1" className="block mb-1">
                        SERVICE LOGINS
                      </label>
                      <small id="emailHelp" class="form-text text-muted mb-1">
                        You don't have any service logins setup
                      </small>
                      <div>
                        <select
                          className="input-field w-100 p-2 my-2 border bg-white"
                          name="nature"
                          aria-label=".form-select-lg example"
                        >
                          <option value="National Highway">
                            National Highway
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold">CONTACT</h3>
                  <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-3  my-2">
                    <div className="my-3">
                      <label for="exampleInputEmail1">FIRST NAME</label>
                      <input
                        type="email"
                        class="form-control my-1 rounded-0 p-2 "
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="my-3">
                      <label for="exampleInputEmail1">LAST NAME</label>
                      <input
                        type="email"
                        class="form-control my-1 rounded-0 p-2"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="my-3">
                      <label for="exampleInputEmail1">TELEPHONE</label>
                      <input
                        type="email"
                        class="form-control my-1 rounded-0 p-2"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="my-3">
                      <label for="exampleInputEmail1">ORGANIZATION</label>
                      <input
                        type="email"
                        class="form-control my-1 rounded-0 p-2"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold">SAVE CHANGES</h3>
                  <button className="my-4 bg-green-500 text-white p-2">
                    Save All Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 md:col-span-1 max-w-xl">
                <div className="px-3">
                  <h3 className="text-lg font-semibold">ICAL FEED LINK</h3>
                  <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-x-3  mt-2">
                    <div className="my-3">
                      <p className="mb-4">
                        Use this link to pull your booking information from
                        Skedda into your external calendar{" "}
                        <span className="text-blue-500">(more info).</span>
                      </p>
                      <label
                        for="exampleInputEmail1"
                        className="text-sm font-semibold"
                      >
                        YOUR ICAL LINK
                      </label>
                      <div class="input-group my-2">
                        <input
                          type="text"
                          class="form-control rounded-0"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary rounded-0"
                            type="button"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="my-2">
                      <div>
                        <select
                          className="input-field  p-2  border bg-white"
                          name="nature"
                          aria-label=".form-select-lg example"
                        >
                          <option value="National Highway">
                            Regenerate Link
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  </div>
      {/* </div> */}
      {/* <div className="overlay">
        <div className="popup">
          <div>
            <div className="flex justify-between bg-blue-500 text-white p-3">
              <p className="text-lg font-semibold ">
                HOW TO REGISTER
              </p>
              <button>Close</button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <p className="mb-3">
                  An invitation is required to register as a user at Legends
                  Arena , so you'll need to reach out to an administrator.
                </p>
                <h5 className="font-semibold">Legends Arena</h5>
                <p>Stadium Lane 3</p>
                <p>Karachi 75500</p>
                <p>Tel: <span className="text-blue-500">0300 1127362</span></p>
                <p>Email:<span className="text-blue-500"> info@totalsports.pk</span></p>
                <p>Web:<span className="text-blue-500" > https://www.legendsarena.pk</span></p>
              </div>
              <button className="mt-4 border p-2 px-4">Close</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
