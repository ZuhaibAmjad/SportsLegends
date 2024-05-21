import { faBook, faGear, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import RegisterPopUp from "./RegisterPopUp";

export default function UserSideBar() {
  const [ register,setRegister ]=useState(false);
  return (
    <div className="flex justify-between flex-col bg-blue-500 p-2">
      <div className="flex flex-col space-y-2">
        <button className="text-white">Logo</button>
        <Link to="/">
          <Tooltip title="Delete">
            <IconButton>
            <FontAwesomeIcon className="text-white" icon={faBook} />
            </IconButton>
          </Tooltip>
        </Link>
        {/* <Link to="/users">
          <Tooltip title="users">
            <IconButton>
              <FontAwesomeIcon className="text-white" icon={faUsers} />
            </IconButton>
          </Tooltip>
        </Link> */}
      </div>
      <div className="flex flex-col space-y-2 my-3">
        {/* <Link to="/">
          <Tooltip title="setting">
            <IconButton>
              <FontAwesomeIcon className="text-white" icon={faGear} />
            </IconButton>
          </Tooltip>
        </Link> */}
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <FontAwesomeIcon style={{ color: "white" }} className="h-6 w-6" icon={faUser} />
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
            <Menu.Items className="absolute -left-4 -top-24 z-1000 mt-2 w-48 origin-top-left rounded-md bg-white  shadow-lg ">
              <Menu.Item>
                  <Link to="/updateProfile"  className="block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white">
                    Profile
                  </Link>
              </Menu.Item>
              <Menu.Item>
                  <Link to="/login"  className="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500">
                    Log out
                  </Link>
              </Menu.Item>
              {/* <Menu.Item>
                  <button onClick={(e)=> setRegister(true)}  className="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500">
                    Register
                  </button>
              </Menu.Item> */}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {register && (
        <RegisterPopUp/>
      )}
    </div>
  );
}
