import React, { useEffect, useState } from "react";
// import UserSideBar from "../../Components/UserSideBar";
// import Navbar from "../../Components/Navbar";
// import Month from "./Month";
// import Grid from "./Grid";
// import Day from "./Day";
// import List from "./List";
// import Map from "./Map";
import Resource from "./Day";
import DnDResource from "./MyDays";
import Navbar from "../../Components/Navbar";
import UserSideBar from "../../Components/UserSideBar";

export default function Home() {
  const [selectedFormat, setSelectedFormat] = useState("day");
  const handleLogButtonClick = (logType) => {
    setSelectedFormat(logType);
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
    {isWideScreen ? (
      <UserSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
    ) : (
      <Navbar className="" />
    )}
      <div className="w-full overflow-hidden  h-[100vh]">
        <div className="w-100 bg-white py-2">
          {/* <button
            className={`text-md font-semibold   px-3 py-2 ${
              selectedFormat === "day" ? "bg-gray-300" : "bg-gray-200"
            }`}
            onClick={() => handleLogButtonClick("day")}
          >
            Day
          </button>
          <button
            className={`text-md font-semibold   px-3 py-2 ${
              selectedFormat === "month" ? "bg-gray-300" : "bg-gray-200"
            }`}
            onClick={() => handleLogButtonClick("month")}
          >
           Month
          </button>
          <button
            className={`text-md font-semibold   px-3 py-2 ${
              selectedFormat === "grid" ? "bg-gray-300" : "bg-gray-200"
            }`}
            onClick={() => handleLogButtonClick("grid")}
          >
            Grid
          </button>
          <button
            className={`text-md font-semibold   px-3 py-2 ${
              selectedFormat === "list" ? "bg-gray-300" : "bg-gray-200"
            }`}
            onClick={() => handleLogButtonClick("list")}
          >
            List
          </button>
          <button
            className={`text-md font-semibold   px-3 py-2 ${
              selectedFormat === "map" ? "bg-gray-300" : "bg-gray-200"
            }`}
            onClick={() => handleLogButtonClick("map")}
          >
            Map
          </button> */}

        </div>
        {/* {selectedFormat === 'day' && <Day />} */}
        {/* {selectedFormat === 'month' && <Month  />}
        {selectedFormat === 'grid' && <Grid  />}
        {selectedFormat === 'list' && <List />}
        {selectedFormat === 'map' && <Map />} */}
        <Resource/>

        {/* <DnDResource/> */}
      </div>
    </div>
  );
}


