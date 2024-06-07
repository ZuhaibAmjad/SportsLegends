import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import RegisterPopUp from "./RegisterPopUp";
import Cookies from "universal-cookie";
import axios from "axios";
import BookingsIcon from "../assets/BookingsIcon";
import DashboardIcon from "../assets/DashboardIcon";
import UsersIcon from "../assets/UsersIcon";
import SettingsIcon from "../assets/SettingsIcon";
import ProfileIcon from "../assets/ProfileIcon";

export default function AdminSideBar() {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logOut = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      const token = cookies.get('authorization');
      console.log(token);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );
      cookies.remove("authorization");
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 402) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-between flex-col bg-blue-500 p-2">
      <div className="flex flex-col space-y-2 items-center">
        <Link className="text-white" to="/admin/booking">Logo</Link>
        <Link to="/admin/booking">
          <Tooltip title="Bookings">
            <IconButton>
              <BookingsIcon className="text-white h-6 w-6" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/admin">
          <Tooltip title="Dashboard">
            <IconButton>
              <DashboardIcon className="text-white h-6 w-6" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/admin/users">
          <Tooltip title="Users">
            <IconButton>
              <UsersIcon className="text-white h-6 w-6" />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
      <div className="flex flex-col space-y-2 my-3 items-center">
        <Link to="/admin/settings">
          <Tooltip title="Settings">
            <IconButton>
              <SettingsIcon className="text-white h-6 w-6" />
            </IconButton>
          </Tooltip>
        </Link>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="relative flex bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <ProfileIcon className="text-white h-6 w-6" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -left-4 -top-24 z-50 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg">
              <Menu.Item>
                <Link to="/admin/Profile" className="block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white">
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button onClick={logOut} className="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500">
                  Log out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {register && (
        <RegisterPopUp />
      )}
    </div>
  );
}
