import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import {
  Checkbox,
  FormControl,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCalendarPlus,
  faClock,
  faCircleXmark,
  faBan,
  faHouseUser,
  faUser,

} from "@fortawesome/free-solid-svg-icons";
import UnavailableEvent from "../../Components/UnavailableEvent";
import UserBooking from "../../Components/UserBooking";
import InternelEvent from "../../Components/InternelEvent";
import axios from "axios";
import Cookies from "universal-cookie";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DatePicker from "@mui/lab/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { styled, alpha } from "@mui/material/styles";

const localizer = momentLocalizer(moment);

// const resourceMap = [
//   {
//     resourceId: 1,
//     resourcePrice: 3000,
//     resourceTitle: "Padel Court 1",
//   },
//   {
//     resourceId: 2,
//     resourcePrice: 3500,
//     resourceTitle: "Padel Court 2",
//   },
//   {
//     resourceId: 3,
//     resourcePrice: 3000,
//     resourceTitle: "Padel Court 3",
//   },
//   {
//     resourceId: 4,
//     resourcePrice: 3000,
//     resourceTitle: "Padel Court 4",
//   },
//   {
//     resourceId: 5,
//     resourcePrice: 3000,
//     resourceTitle: "Padel Court 5",
//   },
//   {
//     resourceId: 6,
//     resourcePrice: 3000,
//     resourceTitle: "Cricket ( 9-aside )",
//   },
//   {
//     resourceId: 7,
//     resourcePrice: 2000,
//     resourceTitle: "Cricket ( 7-aside )",
//   },
//   {
//     resourceId: 8,
//     resourcePrice: 4000,
//     resourceTitle: "Super Sunday ( 7-aside )",
//     start: new Date().setHours(11, 0, 0), // 12pm
//     end: new Date().setHours(23, 0, 0),
//   },
// ];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 80,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function AdminResource() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [myEvents, setMyEvents] = useState([]);
  const [showHeader, setShowHeader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  let [resource, setResource] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = useState(false);

  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    start: "",
    end: "",
    resourceId: "",
    price: "",
    type: "",
    paymentStatus: "",
    userID: "",
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const cookies = new Cookies();

  const CustomView = ({ events }) => {
    const eventsByDate = events.reduce((acc, event) => {
      const date = event.start.toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    console.log(resource, ">>>>>>>>>>>>>>>>>>>>>>");

    return (
      <div className="h-100 overflow-y-scroll p-2 w-full">
        <div className="flex justify-between w-full">
          <div className="flex">
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={filter}
              onClose={hidePopup}
            >
              <MenuItem
                // onClick={hidePopup}
                disableRipple
                style={{
                  fontSize: "14px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                {/* <EditIcon style={{ fontSize: "18px" }} /> */}
                View/Edit details
              </MenuItem>
              <MenuItem
                // onClick={hidePopup}
                disableRipple
                style={{
                  fontSize: "14px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                {/* <FileCopyIcon style={{ fontSize: "16px" }} /> */}
                Duplicate
              </MenuItem>
              <MenuItem
                // onClick={(e) => setConfirm(!confirm)}
                disableRipple
                style={{
                  fontSize: "14px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
                className="DeleteList"
              >
                {/* <DeleteOutlineIcon
                  style={{ fontSize: "18px" }}
                  className="DeleteList"
                /> */}
                Remove
              </MenuItem>
              {/* {confirm && (
          <div className="ml-3">
            <MenuItem
              onClick={deleteBooking}
              disableRipple
              style={{
                fontSize: "14px",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            >
              <CheckCircleOutlineIcon
                style={{ fontSize: "18px", color: "green" }}
              />
              Yes , do it
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              disableRipple
              style={{
                fontSize: "14px",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            >
              <CancelIcon style={{ fontSize: "18px" }} className="DeleteList" onClick={(e) => setConfirm(!confirm)} />
              No , do not
            </MenuItem>
          </div>
        )} */}
            </StyledMenu>
            <input
              type="text"
              name="email"
              size="small"
              // onChange={getUserdata}
              required
              class="form-control rounded-0"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <button className="border p-1 m-1">Activity </button>
          </div>
          <div className="flex">
            <p className="bg-green-100 border p-1 m-1 rounded-1">20 match</p>
            <button className="border  p-1 m-1 rounded-1">Export</button>
            <button className="border  p-1 m-1 rounded-1">Print</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <tbody className="divide-y divide-gray-200 w-full">
              {Object.entries(eventsByDate).map(([date, events]) => (
                <div key={date}>
                  <h2 className="theme-color text-md font-semibold">{date}</h2>

                  {events.map((event) => (
                    <tr className="hover:bg-gray-300 space-x-2 w-full">
                      {" "}
                      <td
                        style={{ width: "20%" }}
                        className="whitespace-nowrap p-1 text-gray-700"
                        key={event.id}
                      >
                        {event.start.toLocaleTimeString()} -{" "}
                        {event.end.toLocaleTimeString()}
                      </td>
                      <td style={{ width: "15%" }}>
                        {event.resourceId.map((eventId) => {
                          // Find matching resource for each event ID
                          const matchingResource = resource.find(
                            (resource) => resource._id === eventId
                          );
                          // If a matching resource is found, render its title
                          if (matchingResource) {
                            return (
                              <td key={eventId}>{matchingResource.name}</td>
                            );
                          }
                          return null; // Render nothing if no match
                        })}
                      </td>
                      <td style={{ width: "15%" }}>{event.userId}</td>
                      <td style={{ width: "40%" }}>{event.title}</td>
                      <td style={{ width: "10%" }}>{event.paymentStatus}</td>
                    </tr>
                  ))}
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  CustomView.title = () => {
    return null;
  };

  // CustomView.range = (start, end, localizer) => {
  //   const range = [];
  //   let current = moment(start);

  //   while (current.isSameOrBefore(end)) {
  //     range.push(current.clone()); // Clone the moment object to avoid mutating it
  //     current = current.add(1, 'day');
  //   }

  //   return range;
  // }

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    const [activeTab, setActiveTab] = useState("day");
    const handleTabClick = (view) => {
      setActiveTab(view);
      onView(view);
    };
    const handleNavigate = (direction) => {
      onNavigate(direction, activeTab);
    };
    return (
      <>
        {showHeader ? (
          <div className="flex bg-gray-100 space-x-3 p-1 py-3">
            <div className=" flex justify-center items-center pl-2">
              <FontAwesomeIcon
                className="h-5 mr-2 bg-blue-500 p-2 text-white rounded-5"
                icon={faCalendarPlus}
              />
              <span className="border-r-2 border-gray-500 pr-3">
                {newEvent && newEvent.date && newEvent.date}
              </span>
            </div>
            <div className="flex justify-center items-center ">
              <FontAwesomeIcon className="h-5 mr-3" icon={faClock} />
              <span className="border-r-2 border-gray-500 pr-3">
                {moment(selectedEvent && selectedEvent.start).format("h:mm A")}{" "}
                - {moment(selectedEvent && selectedEvent.end).format("h:mm A")}
              </span>
            </div>
            <div className="flex justify-center items-center">
              {selectedEvent && selectedEvent.end && (
                <div className="border-r-2 border-gray-500 pr-3">
                  {resource.map((space) => {
                    if (space._id === selectedEvent.resourceId) {
                      return <p key={space._id}>{space.name}</p>;
                    }
                  })}
                  {!resource.find(
                    (space) => space._id === selectedEvent.resourceId
                  ) && <p>Unknown Resource</p>}
                </div>
              )}
            </div>

            <div className=" pr-3 flex justify-center items-center">
              {newEvent && newEvent.price}
            </div>
            <div className="border p-2  flex justify-center items-center bg-green-400 hover:bg-green-600 text-white px-4">
              <button onClick={Booked}>Book</button>
            </div>
            <div className="border border-black p-2  flex justify-center items-center hover:bg-gray-600 hover:text-white">
              <button onClick={closeHeader}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-1 p-3 bg-gray-100">
              <div className="">
                <button
                  onClick={() => handleTabClick("day")}
                  className={`rounded-l-sm py-2 px-3 text-md font-semibold ${activeTab === "day" ? "bg-white" : "bg-gray-300 hover:bg-gray-200"
                    }`}
                >
                  DAY
                </button>

                <button
                  onClick={() => handleTabClick("month")}
                  className={`py-2 px-3 text-md font-semibold ${activeTab === "month" ? "bg-white" : "bg-gray-300 hover:bg-gray-200"
                    }`}
                >
                  MONTH
                </button>
                <button
                  onClick={() => handleTabClick("grid")}
                  className={`py-2 px-3 text-md font-semibold ${activeTab === "grid" ? "bg-white" : "bg-gray-300 hover:bg-gray-200"
                    }`}
                >
                  GRID
                </button>
                <button
                  onClick={() => handleTabClick("week")}
                  className={`rounded-r-sm py-2 px-3 text-md font-semibold ${activeTab === "week" ? "bg-white" : "bg-gray-300 hover:bg-gray-200"
                    }`}
                >
                  LIST
                </button>
              </div>
              <button
                onClick={() => handleNavigate("PREV")}
                className="rounded-l-sm ml-2 bg-gray-300 hover:bg-gray-200"
              >
                <ArrowBackIosIcon className="h-8 p-1" />
              </button>
              <button
                onClick={() => handleNavigate("NEXT")}
                className="rounded-r-sm bg-gray-300 hover:bg-gray-200"
              >
                <ArrowForwardIosIcon className="h-8 p-1" />
              </button>
              {/* <StaticDatePicker defaultValue={moment('2024-04-17')} /> */}
              <span>  {label} </span>
            </div>
          </>
          
        )
        }
      </>
    );
  };

  const closeHeader = () => {
    setShowHeader(false);
    setSelectedEvent(null);
    // if (myEvents && myEvents.length > 0) {
    //   const updatedEvents = [...myEvents]; // Create a copy of the array
    //   updatedEvents.pop(); // Remove the last element
    //   setMyEvents(updatedEvents);
    // }
  };

  const getSpaces = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/space/list`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setResource(response.data);
        // setSelectedSpace(spaces[0])
      }
    } catch (error) {
      alert("An error occurred while fetching spaces");
    }
  };

  const MakeBooking = async (e) => {
    e.preventDefault();
    const {
      date,
      title,
      start,
      end,
      resourceId,
      type,
      price,
      paymentStatus,
      userID,
    } = newEvent;

    let data;
    if (date && title && start && end && resourceId && type) {
      console.log(newEvent);

      // Extract year, month, and day from the date string
      const [year, month, day] = newEvent.date.split("-").map(Number);

      // Convert start and end times to 24-hour format
      const [startHour, startMinute] = convertTo24Hour(newEvent.start)
        .split(":")
        .map(Number);
      const [endHour, endMinute] = convertTo24Hour(newEvent.end)
        .split(":")
        .map(Number);

      // Create Date objects for start and end times
      const startDate = new Date(year, month - 1, day, startHour, startMinute);
      const endDate = new Date(year, month - 1, day, endHour, endMinute);
      try {
        const token = cookies.get("authorization");
        console.log(token);
        const userId = cookies.get("userId");
        console.log(userId);
        const params = new URLSearchParams();
        params.append("date", date);
        params.append("title", title);
        params.append("start", startDate);
        params.append("end", endDate);
        // params.append("resourceId", resourceId);
        params.append("type", type);
        params.append("price", price);
        params.append("paymentStatus", paymentStatus);
        params.append("userID", userId);
        resourceId.forEach((id) => params.append("resourceId", id));

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/booking`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response);
        data = response.data;
        console.log(data);
        if (response && response.status === 201) {
          const AddEvent = {
            ...newEvent,
            start: startDate,
            end: endDate,
          };
          const updatedEvents = [...myEvents, AddEvent];
          setMyEvents(updatedEvents);
          closeDailog();
        }
      } catch (error) {
        if (error && error.response.status === 401) {
          // setErrMsg(
          //   "Sorry, your login credentials are not correct. Please double-check your email and password. You can use the login-reset feature if you have forgotten your password."
          // );
          // setLoading(false);
          // setError(true);
          console.log(error);
          return;
        } else if (error && error.response.status === 403) {
          // setErrMsg("Internel Server Error");
          // setLoading(false);
          // setError(true);
          alert("Please Login First");
          console.log(error);
          return;
        } else if (error && error.response.status === 500) {
          // setErrMsg("Internel Server Error");
          // setLoading(false);
          // setError(true);
          console.log(error);
          return;
        } else {
          alert("Please Check your Internet Connection and Try Again");
          // setLoading(false);
          // setError(true);
          console.log(error);
          return;
        }
      }
    } else {
      // setErrMsg("Please Enter Email and Password to Continue");
      // setLoading(false);
      // setError(true);
      // console.log(error);
      return;
    }
  };

  const getEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/event/list`
      );
      const result = await response.json();
      if (response.status === 200) {
        const modifiedEvents = result.map((event) => ({
          ...event,
          id: event._id,
          end: new Date(event.end),
          start: new Date(event.start), // Convert start to a Date object
        }));
        console.log(modifiedEvents, "Result");

        setMyEvents(modifiedEvents);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSpaces();
    getEvents();
  }, []);

  const deleteEvent = (EventId) => {
    setMyEvents((prevUsers) =>
      prevUsers.filter((myEvents) => myEvents.id !== EventId)
    );
  };

  const updateUser = (updatedUser) => {
    console.log("Trigeered >>>>>");
    setMyEvents((prevUsers) =>
      prevUsers.map((event) =>
        event._id === updatedUser._id ? { ...event, ...updatedUser } : event
      )
    );
  };

  const [personName, setPersonName] = React.useState([]);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 1;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [currentPage, setCurrentPage] = useState("user");

  const names = [
    "Advance Payment Custumer",
    "Star Custumer",
    "Total Booking Team",
    "Total Team Viewer",
  ];

  const CreateEvent = () => {
    console.log(newEvent);

    // Check the values of newEvent.date, newEvent.start, and newEvent.end
    // console.log("Date:", newEvent.date);
    // console.log("Start:", newEvent.start);
    // console.log("End:", newEvent.end);

    // Extract year, month, and day from the date string
    const [year, month, day] = newEvent.date.split("-").map(Number);

    // Convert start and end times to 24-hour format
    const [startHour, startMinute] = convertTo24Hour(newEvent.start)
      .split(":")
      .map(Number);
    const [endHour, endMinute] = convertTo24Hour(newEvent.end)
      .split(":")
      .map(Number);

    // Create Date objects for start and end times
    const startDate = new Date(year, month - 1, day, startHour, startMinute);
    const endDate = new Date(year, month - 1, day, endHour, endMinute);

    console.log(startDate, endDate);

    // Update the newEvent object with the Date objects
    const AddEvent = {
      ...newEvent,
      start: startDate,
      end: endDate,
    };
    console.log(AddEvent, ">> New");
    console.log(myEvents);

    // Push the updated event to the events array
    const updatedEvents = [...myEvents, AddEvent];
    setMyEvents(updatedEvents);

    // Optional: Log the updated events array for verification
    closeDailog();
  };

  // Function to convert time from AM/PM format to 24-hour format
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const Booked = () => {
    setOpen(true);
    setNewEvent({
      ...newEvent,
      start: new Date(selectedEvent.start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      end: new Date(selectedEvent.end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "user",
      resourceId: [selectedEvent.resourceId],
    });
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
      const title = window.prompt("New Event name");
      console.log("Title:", title);
      if (title) {
        const newEvent = {
          start: new Date(start),
          end: new Date(end),
          // title,
          resourceId,
        };
        console.log("New Event:", newEvent);
        setSelectedEvent(newEvent);
        setShowHeader(true);
        setMyEvents((prev) => [...prev, newEvent]);
      }
    },
    [setMyEvents, myEvents]
  );

  const CustomMonthEvent = ({ event }) => {
    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");
    return (
      <div>
        <p className="custum-month">
          {startTime}-{endTime}
        </p>
      </div>
    );
  };

  const CustomPopup = ({ event }) => {
    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");
    return (
      // Custom popup JSX
      <div className="custum-month">
        <p>
          {startTime}-{endTime}
        </p>
        {/* Additional event details */}
      </div>
    );
  };

  const PageChange = (page) => {
    setCurrentPage(page);
    if (page === "user") {
      setNewEvent({
        ...newEvent,
        type: page,
      });
    } else if (page === "internal") {
      setNewEvent({
        ...newEvent,
        type: "internel",
      });
    } else {
      setNewEvent({
        ...newEvent,
        type: "not_availabel",
      });
    }
  };

  const CustomEventWrapper = ({ event }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    if (event.type === "user") {
      return (
        <UserBooking
          myObject={event}
          resources={resource}
          deleteEvent={deleteEvent}
          updateUser={updateUser}
        />
      );
    } else if (event.type === "not_availabel") {
      return <UnavailableEvent myObject={event} />;
    } else if (event.type === "internel") {
      return (
        <InternelEvent
          myObject={event}
          resources={resource}
          deleteEvent={deleteEvent}
          updateUser={updateUser}
        />
      );
    }
  };

  const components = {
    event: CustomEventWrapper,
    month: {
      event: CustomMonthEvent,
    },
    toolbar: CustomToolbar,
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: Date.now(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const selecting = (event, date) => {
    let price;
    setSelectedEvent(event);
    if (selectedItems && selectedItems.length >= 1) {
      selectedItems.shift();
    }
    selectedItems.push(event.resourceId);

    const selectedResource = resource.find(
      (resource) => resource._Id === event.resourceId
    );

    if (selectedResource) {
      price = selectedResource.resourcePrice;
    } else {
      price = 0;
    }

    const startDate = new Date(event.start);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it starts from 0
    const day = String(startDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    // setSelectedEvent({
    //   ...selectedEvent,
    //   date: formattedDate,
    // })

    setNewEvent({
      ...newEvent,
      price: price,
      resourceId: event.resourceId,
      date: formattedDate,
    });
    console.log(event);

    setShowHeader(true);
  };

  const getEventData = (e) => {
    console.log("Run");
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
    console.log(newEvent);
  };

  const handleCheckboxChange = (item) => {
    const selectedIndex = selectedItems.indexOf(item._id);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      // Checkbox is checked
      newSelectedItems.push(item._id);
    } else {
      // Checkbox is unchecked
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);

    // Calculate total price of selected resources
    // const totalPrice = newSelectedItems.reduce((accumulator, resourceId) => {
    //   const selectedResource = resourceMap.find(resource => resource.resourceId === resourceId);
    //   return accumulator + (selectedResource ? selectedResource.resourcePrice : 0);
    // }, 0);

    // Update newEvent with total price
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      resourceId: newSelectedItems,
      // totalPrice: totalPrice
    }));
  };

  const hidePopup = () => {
    setFilter(false);
  };

  const closeDailog = () => {
    setOpen(false);
    setShowHeader(false);
    setSelectedItems([]);
    setNewEvent({
      date: "",
      title: "",
      start: "",
      end: "",
      resourceId: "",
      price: "",
      paymentStatus: "",
    });
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce((accumulator, resourceId) => {
      const selectedResource = resource.find(
        (resource) => resource._id === resourceId
      );
      return (
        accumulator + (selectedResource ? selectedResource.resourcePrice : 0)
      );
    }, 0);

    // Update newEvent's resourceId based on selectedItems whenever selectedItems change
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      price: totalPrice,
      resourceId: selectedItems,
    }));
  }, [selectedItems]);

  useEffect(() => {
    console.log(myEvents);
  }, [myEvents]);

  // const slotPropGetter = useCallback(
  //   (date) => ({
  //     className: 'slotDefault',
  //     ...(moment(date).hour() < 8 && {
  //       style: {
  //         backgroundColor: 'powderblue',
  //         color: 'black',

  //       },
  //     }),
  //     ...(moment(date).hour() > 12 && {
  //       style: {
  //         backgroundColor: 'darkgreen',
  //         color: 'white',
  //       },
  //     }),
  //   }),
  //   []
  // )
  
  return (
    <Fragment>
      <style>
        {`
            .hoverable-slot:hover {
              background-color: #d9edf7 !important;
              cursor: pointer;
            }
          `}
      </style>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={closeDailog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 max-w-5xl">
                  <div className="">
                    <div className=" bg-white w-full">
                      <div className="w-full ">
                        <div className="">
                          <div className="border">

                            <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-3">
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  className="h-5 mr-2 bg-blue-500 p-2 text-white rounded-5"
                                  icon={faCalendarPlus}
                                />
                                <h1 className="fs-4 text-semibold">
                                  NEW BOOKING
                                </h1>
                              </div>
                              <button
                                onClick={closeDailog}
                                className="rounded-full p-2 text-sm hover:bg-blue-700 flex items-center bg-blue-500 text-white"
                                ref={cancelButtonRef}
                              >
                                <FontAwesomeIcon icon={faCircleXmark} className="h-6" />
                              </button>
                            </div>


                            <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3 ">
                              <div className="lg:grid-cols-3 md:grid-cols-3 sm:grid-col-1 my-3 space-x-3">
                                <button
                                  className={`border px-3 py-2 rounded-1 ${currentPage === "user" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                                    }`}
                                  onClick={() => PageChange("user")}
                                >
                                  <FontAwesomeIcon icon={faUser} />
                                  <span className="ml-2">User Booking</span>
                                </button>
                                <button
                                  className={`border px-3 py-2 rounded-1 ${currentPage === "internal" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                                    }`}
                                  onClick={() => PageChange("internal")}
                                >
                                  <FontAwesomeIcon icon={faHouseUser} />
                                  <span className="ml-2">Internal Use</span>
                                </button>
                                <button
                                  className={`border px-3 py-2 rounded-1 ${currentPage === "unavailable" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                                    }`}
                                  onClick={() => PageChange("unavailable")}
                                >
                                  <FontAwesomeIcon icon={faBan} />
                                  <span className="ml-2">Unavailable</span>
                                </button>
                              </div>

                              <div className="my-2 mt-4">
                                <label
                                  className="text-sm"
                                  for="exampleInputEmail1"
                                >
                                  DATE AND TIME
                                </label>
                                <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4 my-3">
                                  <div className="space-y-2">
                                    <div>
                                      <input
                                        type="date"
                                        name="date"
                                        value={newEvent.date}
                                        onChange={getEventData}
                                        class="form-control rounded-0"
                                        placeholder="e.g Sally"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        required

                                      />
                                    </div>
                                  </div>
                                  <div className=" grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                                    <div>
                                      <select
                                        className="form-control rounded-0"
                                        name="start"
                                        value={newEvent && newEvent.start}
                                        onChange={getEventData}
                                      >

                                        <option
                                          value={newEvent && newEvent.start}

                                        >
                                          From
                                          <span> {newEvent && newEvent.start}</span>
                                        </option>
                                        <option value="12:00 ">
                                          12:00 AM
                                        </option>
                                        <option value="12:30 AM">
                                          12:30 AM
                                        </option>
                                        <option value="1:00 AM">1:00 AM</option>
                                        <option value="1:30 AM">1:30 AM</option>
                                        <option value="2:00 AM">2:00 AM</option>
                                        <option value="2:30 AM">2:30 AM</option>
                                        <option value="3:00 AM">3:00 AM</option>
                                        <option value="3:30 AM">3:30 AM</option>
                                        <option value="4:00 AM">4:00 AM</option>
                                        <option value="4:30 AM">4:30 AM</option>
                                        <option value="5:00 AM">5:00 AM</option>
                                        <option value="5:30 AM">5:30 AM</option>
                                        <option value="6:00 AM">6:00 AM</option>
                                        <option value="6:30 AM">6:30 AM</option>
                                        <option value="7:00 AM">7:00 AM</option>
                                        <option value="7:30 AM">7:30 AM</option>
                                        <option value="8:00 AM">8:00 AM</option>
                                        <option value="8:30 AM">8:30 AM</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="9:30 AM">9:30 AM</option>
                                        <option value="10:00 AM">
                                          10:00 AM
                                        </option>
                                        <option value="10:30 AM">
                                          10:30 AM
                                        </option>
                                        <option value="11:00 AM">
                                          11:00 AM
                                        </option>
                                        <option value="11:30 AM">
                                          11:30 AM
                                        </option>
                                        <option value="12:00 PM">
                                          12:00 PM
                                        </option>
                                        <option value="12:30 PM">
                                          12:30 PM
                                        </option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="1:30 PM">1:30 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="2:30 PM">2:30 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="3:30 PM">3:30 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="4:30 PM">4:30 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                        <option value="5:30 PM">5:30 PM</option>
                                        <option value="6:00 PM">6:00 PM</option>
                                        <option value="6:30 PM">6:30 PM</option>
                                        <option value="7:00 PM">7:00 PM</option>
                                        <option value="7:30 PM">7:30 PM</option>
                                        <option value="8:00 PM">8:00 PM</option>
                                        <option value="8:30 PM">8:30 PM</option>
                                        <option value="9:00 PM">9:00 PM</option>
                                        <option value="9:30 PM">9:30 PM</option>
                                        <option value="10:00 PM">
                                          10:00 PM
                                        </option>
                                        <option value="10:30 PM">
                                          10:30 PM
                                        </option>
                                        <option value="11:00 PM">
                                          11:00 PM
                                        </option>
                                        <option value="11:30 PM">
                                          11:30 PM
                                        </option>
                                      </select>
                                    </div>
                                    <div>
                                      <select
                                        className="form-control rounded-0"
                                        value={newEvent && newEvent.end}
                                        onChange={getEventData}
                                        name="end"
                                      >
                                        <option
                                          value={newEvent && newEvent.end}
                                        > To
                                          <span> {newEvent && newEvent.end}</span>
                                        </option>
                                        <option value="12:00 AM">
                                          12:00 AM
                                        </option>
                                        <option value="12:30 AM">
                                          12:30 AM
                                        </option>
                                        <option value="1:00 AM">1:00 AM</option>
                                        <option value="1:30 AM">1:30 AM</option>
                                        <option value="2:00 AM">2:00 AM</option>
                                        <option value="2:30 AM">2:30 AM</option>
                                        <option value="3:00 AM">3:00 AM</option>
                                        <option value="3:30 AM">3:30 AM</option>
                                        <option value="4:00 AM">4:00 AM</option>
                                        <option value="4:30 AM">4:30 AM</option>
                                        <option value="5:00 AM">5:00 AM</option>
                                        <option value="5:30 AM">5:30 AM</option>
                                        <option value="6:00 AM">6:00 AM</option>
                                        <option value="6:30 AM">6:30 AM</option>
                                        <option value="7:00 AM">7:00 AM</option>
                                        <option value="7:30 AM">7:30 AM</option>
                                        <option value="8:00 AM">8:00 AM</option>
                                        <option value="8:30 AM">8:30 AM</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="9:30 AM">9:30 AM</option>
                                        <option value="10:00 AM">
                                          10:00 AM
                                        </option>
                                        <option value="10:30 AM">
                                          10:30 AM
                                        </option>
                                        <option value="11:00 AM">
                                          11:00 AM
                                        </option>
                                        <option value="11:30 AM">
                                          11:30 AM
                                        </option>
                                        <option value="12:00 PM">
                                          12:00 PM
                                        </option>
                                        <option value="12:30 PM">
                                          12:30 PM
                                        </option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="1:30 PM">1:30 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="2:30 PM">2:30 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="3:30 PM">3:30 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="4:30 PM">4:30 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                        <option value="5:30 PM">5:30 PM</option>
                                        <option value="6:00 PM">6:00 PM</option>
                                        <option value="6:30 PM">6:30 PM</option>
                                        <option value="7:00 PM">7:00 PM</option>
                                        <option value="7:30 PM">7:30 PM</option>
                                        <option value="8:00 PM">8:00 PM</option>
                                        <option value="8:30 PM">8:30 PM</option>
                                        <option value="9:00 PM">9:00 PM</option>
                                        <option value="9:30 PM">9:30 PM</option>
                                        <option value="10:00 PM">
                                          10:00 PM
                                        </option>
                                        <option value="10:30 PM">
                                          10:30 PM
                                        </option>
                                        <option value="11:00 PM">
                                          11:00 PM
                                        </option>
                                        <option value="11:30 PM">
                                          11:30 PM
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <label
                                  className="text-sm"
                                  for="Days"
                                >
                                  REPEAT
                                </label>
                                <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-2 my-3">
                                  <div className="">
                                    <select
                                      className="form-control rounded-0"
                                      value={newEvent && newEvent}
                                      onChange={getEventData}
                                      name="end"
                                    >
                                      <option
                                        value={newEvent && newEvent.none}
                                      > None
                                        <span> {newEvent && newEvent.none}</span>
                                      </option>
                                      <option value="None">
                                        None
                                      </option>
                                      <option value="Daily">
                                        Daily
                                      </option>
                                      <option value="Weekly">Weekly</option>
                                      <option value="Monthly">Monthly</option>
                                      <option value="Yearly">Yearly</option>

                                    </select>
                                  </div>
                                </div>

                              </div>

                              <div className="mb-2">
                                <FormControl sx={{ width: "100%" }}>
                                  <label
                                    className="text-sm my-2  "
                                    for="exampleInputEmail1"
                                  >

                                    SPACES
                                  </label>
                                  {/* <FontAwesomeIcon icon={faGrip} className="h-6" /> */}
                                  <Select

                                    labelId="select-multiple-checkbox-label"
                                    id="select-multiple-checkbox"
                                    multiple
                                    size="small"
                                    value={selectedItems}
                                    onChange={(e) =>
                                      setSelectedItems(e.target.value)
                                    }
                                    renderValue={(selected) => (
                                      <div className="flex flex-wrap">
                                        {resource
                                          .filter((item) =>
                                            selected.includes(item._id)
                                          )
                                          .map((item) => (
                                            <div key={item._id} className="m-1">
                                              {item.name}
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                  >
                                    {resource.map((item) => (
                                      <MenuItem
                                        key={item._id}
                                        value={item._id}
                                        className="p-0 "
                                      >
                                        <Checkbox
                                          checked={selectedItems.includes(
                                            item._id
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(item)
                                          }
                                          className=""
                                          size="small"
                                        />
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="my-2">
                                <label
                                  className="text-sm "
                                  for="exampleInputEmail1"
                                >
                                  HOLDER
                                </label>
                                <div>
                                  <select
                                    className="input-field w-100 p-2 my-2 border bg-white"
                                    name="nature"
                                    aria-label=".form-select-lg example"
                                  >
                                    <option value="">
                                      Users From Background
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="my-2">
                                <label
                                  className="text-sm my-2"
                                  for="exampleInputEmail1"
                                >
                                  BOOKING TITLE
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  onChange={getEventData}
                                  class="form-control rounded-0"
                                  placeholder="An Optional Booking Summary"
                                  aria-label="Recipient's username"
                                  aria-describedby="basic-addon2"
                                />
                              </div>
                              {currentPage === "user" && (
                                <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 my-3 space-x-4">
                                  <div className="">
                                    <label
                                      className="text-sm"
                                      for="exampleInputEmail1"
                                    >
                                      Price
                                    </label>
                                    <div className="bg-gray-300 flex text-center my-2 justify-center items-center">
                                      <p className="p-2 ">Rs</p>
                                      <input
                                        type="number"
                                        class="form-control rounded-0"
                                        onChange={getEventData}
                                        name="price"
                                        value={
                                          newEvent && newEvent.price
                                            ? newEvent.price
                                            : ""
                                        }
                                        placeholder="00"
                                        readOnly
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                      />
                                      <p className="p-2 ">PKR</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      className="text-sm"
                                      for="exampleInputEmail1"
                                    >
                                      Payment Status
                                    </label>
                                    <select className="form-control rounded-0 my-2">
                                      <option value="paid">Paid</option>
                                      <option value="Un paid">Un Paid</option>
                                      <option value="No Status">Status</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                              <div className="flex space-x-3 my-3">
                                <button
                                  className="border p-2 px-3 text-sm text-white  "
                                  style={{ backgroundColor: "#00A176" }}
                                  onClick={MakeBooking}
                                >
                                  Confirm Booking
                                </button>
                                <button
                                  onClick={closeDailog}
                                  className="border p-2 px-3 text-sm hover:bg-gray-200"
                                  ref={cancelButtonRef}
                                >
                                  Cancel Booking
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Calendar
        defaultDate={defaultDate}
        // defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        resourceIdAccessor="_id"
        resources={resource}
        resourceTitleAccessor="name"
        step={30}
        // resourceComponent={ResourceComponent}
        //   min={new Date().setHours(0, 0, 0)}
        // max={new Date().setHours(21, 59, 59)}
        // onSelectEvent={handleSelectEvent}
        onSelectSlot={selecting}
        onSelecting={selecting}
        components={components}
        selectable
        popup={CustomPopup}
        scrollToTime={scrollToTime}
        views={{
          week: CustomView, // Use your custom component here
          day: true, // Enable day view
          month: true, // Enable month view
        }}
        messages={{}}
      // slotPropGetter={slotPropGetter}
      />
    </Fragment>
  );
}

AdminResource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
