import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import AdminResource from "./Bookings";
import AdminSideBar from "../../Components/AdminSideBar";

export default function AdminHome() {
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
      <AdminSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
    ) : (
      <Navbar className="" />
    )}
      <div className="w-full overflow-hidden  h-[100vh]">
        <div className="w-100 bg-white ">
        </div>
        <AdminResource/>
      </div>
    </div>
  );
}


