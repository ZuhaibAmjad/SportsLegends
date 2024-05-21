import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import ShowMore from "./ShowMore";

export default function InternelEvent({ myObject , resources , deleteEvent , updateUser}) {
  const startTime = moment(myObject.start).format("h:mm A");
  const endTime = moment(myObject.end).format("h:mm A");

  return (
    <div  className="bg-red-600 pl-3 h-100 w-full cursor-pointer"> 
    <div 
        style={{
          backgroundColor: "white",
          position: "relative",
          display:"flex",
          color: "black",
          justifyContent:"space-between",
          padding: "1px",
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
      <p className="font-semibold text-xs">{endTime}</p>
      </p>
      <ShowMore  event={myObject} resources={resources} deleteEvent={deleteEvent} updateUser={updateUser}/>

    </div>
    </div>
  );
}
