import moment from "moment";
import React from "react";

export default function UnavailableEvent({myObject}) {
  const startTime = moment(myObject.start).format("h:mm A");

  return <div className="unavailable-slot w-100 h-100">{startTime}</div>;
}
