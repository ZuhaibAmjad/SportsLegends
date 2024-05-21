import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faCircleUser,
  faSquareRss,
} from "@fortawesome/free-solid-svg-icons";
import AdminSideBar from "../../Components/AdminSideBar";
import Navbar from "../../Components/Navbar";
import Availibilty from "./Availibilty";
import QuotaRules from "./QuotaRules";
import BufferTime from "./BufferTime"
import AddSpaces from "../../Components/AddSpaces"


export default function Setting() {
  const [Show, setShow] = useState('spaces');

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
      <div className="block lg:flex xl:flex 2xl:flex h-[100vh]">
        {isWideScreen ? (
          <AdminSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
        ) : (
          <Navbar className="" />
        )}
        <div className="flex h-[100] w-full">
          <div className="overflow-hidden h-[100vh] w-1/3">
            {/* Content of the first div */}
            <div className="h-full overflow-y-auto overflow-x-hidden">
              {/* Fixed content goes here */}
              <div className="px-2 py-4">
                <div className="p-2">
                  <p className="text-xl font-semibold">
                    <FontAwesomeIcon icon={faCircleUser} className="mr-3 " />
                    SETTINGS
                  </p>
                </div>
                <p className="text-lg text-gray-600 p-2">YOUR VENUE</p>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "spaces" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('spaces')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faPencil} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">Spaces</h3>
                    <p className="text-sm">
                      Your bookables rooms, studios ,courts{" "}
                    </p>
                  </div>
                </button>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "availibility" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('availibility')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">
                      Hours Of Availibility
                    </h3>
                    <p className="text-sm">Your broad "opening hours"</p>
                  </div>
                </button>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "maps" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('maps')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">
                      Floor plans & maps
                    </h3>
                    <p className="text-sm">
                      Beautiful and interactive layouts of your spaces
                    </p>
                  </div>
                </button>
                <p className="text-lg text-gray-600 p-2">RULES</p>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "condition" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('condition')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">
                      Conditions
                    </h3>
                    <p className="text-sm">Rules on a per booking basis</p>
                  </div>
                </button>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "quota" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('quota')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">Quotas</h3>
                    <p className="text-sm">
                      Rules to enforce overall booking allowances
                    </p>
                  </div>
                </button>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "buffer" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('buffer')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">
                      Buffer time
                    </h3>
                    <p className="text-sm">
                      Rules to enforce gap between bookings
                    </p>
                  </div>
                </button>
                <button
                  className={`flex p-2 space-x-3 ml-4  w-100  ${
                    Show === "window" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShow('window')}
                >
                  <div className="">
                    <FontAwesomeIcon icon={faSquareRss} className="h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-blue-500  mb-1 text-start">
                      Booking window
                    </h3>
                    <p className="text-sm">
                      Rules to define how far in advance user can book
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll w-2/3 px-4">
            {/* Content of the second div */}
            <div className="h-full">
              {/* Scrollable content goes here */}
              {Show  === 'availibility'  &&  <Availibilty/> } 
              {Show  === 'buffer'  &&  <BufferTime/> }
              {Show  === 'quota'  &&  <QuotaRules/> }
              {Show  === 'spaces'  && <AddSpaces/> }
              {/* {Show  === ''  &&  <Availibilty/> } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
