import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { faCalendarPlus, faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const localizer = momentLocalizer(moment);

const events = [
    {
      id: 0,
      title: "Board meeting",
      start: new Date(2024, 0, 29, 9, 0, 0),
      end: new Date(2024, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: "MS training",
      start: new Date(2018, 0, 29, 14, 0, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: "Team lead meeting",
      start: new Date(2024, 0, 29, 8, 30, 0),
      end: new Date(2024, 0, 29, 12, 30, 0),
      resourceId: [2, 3],
    },
    {
      id: 11,
      title: "Birthday Party",
      start: new Date(2024, 0, 30, 7, 0, 0),
      end: new Date(20, 0, 30, 10, 30, 0),
      resourceId: 4,
    },
  ];


const Day = () => {
    const [myEvents, setEvents] = useState(events);
    const [showHeader, setShowHeader] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to keep track of selected event
  
   
  
  
  const closeHeader=()=>{
    setShowHeader(false)
    setSelectedEvent(null)
    if (myEvents.length > 0) {
      const updatedEvents = [...myEvents]; // Create a copy of the array
      updatedEvents.pop(); // Remove the last element
      setEvents(updatedEvents);
  }
  }

  const Booked=()=>{
    setShowHeader(false)
  } 

  const CustomEventWrapper = ({ event }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");

    return (
      <div
        style={{
          backgroundColor: "white",
          position: "relative",
          color: "black",
          padding: "5px",
          paddingTop: "1px",
          borderRadius: "0px",
          height: "100%",
        }}
        // onMouseEnter={toggleTooltip}
        // onMouseLeave={toggleTooltip}
      >
        {showTooltip && (
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
            {event.title}
          </div>
        )}
        <p className="font-semibold text-sm mb-1">
          <FontAwesomeIcon className="text-xs " icon={faUser} /> {startTime} -
        </p>
        <p className="font-semibold text-sm">{endTime}</p>
      </div>
    );
  };

  const components = {
    event: CustomEventWrapper,
  };

  const resourceMap = [
    { resourceId: 1, resourceTitle: "Padel Court 1" },
    { resourceId: 2, resourceTitle: "Padel Court 2" },
    { resourceId: 3, resourceTitle: "Padel Court 3" },
    { resourceId: 4, resourceTitle: "Padel Court 4" },
    { resourceId: 5, resourceTitle: "Padel Court 5" },
    { resourceId: 6, resourceTitle: "Cricket ( 9-aside )" },
    { resourceId: 7, resourceTitle: "Cricket ( 7-aside )" },
    { resourceId: 8, resourceTitle: "Super Sunday ( 7-aside )" },
  ];
  
  const slotStyleGetter = (date, resourceId, isSelected) => {
    const isSlotEmpty = myEvents.every((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return !(
        (date >= eventStart && date < eventEnd) ||
        (date <= eventStart && date >= eventEnd)
      );
    });

    if (isSlotEmpty) {
      return {
        className: "hoverable-slot",
      };
    }

    return {};
  };

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId, event }) => {
      const isSlotEmpty = myEvents.every((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          !(
            (start >= eventStart && start < eventEnd) ||
            (end > eventStart && end <= eventEnd) ||
            (start <= eventStart && end >= eventEnd)
          ) || event.resourceId !== resourceId
        );
      });

      if (!isSlotEmpty) {
        window.alert("An event already exists at this time and resource.");
        return;
      }
      // const title = window.prompt("New Event name");
      // console.log("Title:", title);
      // if (title) {
        const newEvent = {
          start: new Date(start),
          end: new Date(end),
          // title,
          resourceId,
        };
        console.log("New Event:", newEvent);
        setSelectedEvent(newEvent);
        setShowHeader(true);
        setEvents((prev) => [...prev, newEvent]);
      // }
    },
    [setEvents, myEvents]
  );

  return (
    <>
    {showHeader && (
        <div className="flex bg-gray-100 space-x-3 p-1">
          <div className="border p-2  flex justify-center items-center border-l">
            <FontAwesomeIcon className="h-6 mr-3" icon={faCalendarPlus} />
            Thur 14 Mar
          </div>
          <div className="border p-2  flex justify-center items-center border-l">
            <FontAwesomeIcon className="h-6 mr-3" icon={faClock} />
            {moment(selectedEvent.start).format("h:mm A")} -{" "}
            {moment(selectedEvent.end).format("h:mm A")}
          </div>
          <div className="border p-2  flex justify-center items-center">
            Padel Court 5
          </div>
          <div className="border p-2  flex justify-center items-center">
            Rs 12000
          </div>
          <div className="border p-2  flex justify-center items-center bg-green-400 text-white px-4">
            <button onClick={Booked}>Book</button>
          </div>
          <div className="border p-2  flex justify-center items-center">
            <button onClick={closeHeader}>Cancle</button>
          </div>
        </div>
      )}
      {/* <div className="height600"> */}
    <Calendar
      localizer={localizer}
      events={events}
      defaultView="day"
      views={["day", "month"]}
      //   components={{
      //     event: com,
      //     timeSlotWrapper: ({ children }) => <div style={{ flex: 1 }}>{children}</div>,
      //   }}
      components={components}
      resourceIdAccessor="resourceId"
      resources={resourceMap}
      resourceTitleAccessor="resourceTitle"
    //   eventPropGetter={(event, start, end, isSelected) => {
    //     // Customize event appearance here, if needed
    //     return {
    //       className: isSelected ? "selected-event" : "",
    //     };
    //   }}
    />
    {/* </div> */}
    </>
  );
};

export default Day;
