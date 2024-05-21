import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";

export default function UserInternelEvent({ myObject }) {
  const startTime = moment(myObject.start).format("h:mm A");
  const endTime = moment(myObject.end).format("h:mm A");

  return (
    <div  className="bg-red-600 pl-3 h-100 w-full cursor-pointer"> 
    <div 
      style={{
        backgroundColor: "white",
        position: "relative",
        color: "black",
        padding: "1px",
        // paddingTop: "1px",
        borderRadius: "0px",
        height: "100%",
      }}
      // onMouseEnter={toggleTooltip}
      // onMouseLeave={toggleTooltip}
    >
      {/* {showTooltip && (
        <div
          style={{
            position: "",
            right: "-10%",
            top: "40%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
          className="tooltipHover"
        >
          {myObject.title}
        </div>
      )} */}
      <p className="font-semibold text-xs mb-1">
        <FontAwesomeIcon className="text-xs p-0" icon={faUser} /> {startTime} -
      </p>
      <p className="font-semibold text-xs">{endTime}</p>
    </div>
    </div>
  );
}
