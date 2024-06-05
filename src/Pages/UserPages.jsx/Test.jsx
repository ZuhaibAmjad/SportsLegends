// import React, {
//     Fragment,
//     useCallback,
//     useEffect,
//     useMemo,
//     useRef,
//     useState,
//   } from "react";
//   import PropTypes from "prop-types";
//   import { Dialog, Transition } from "@headlessui/react";
//   import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
//   import {
//     Checkbox,
//     FormControl,
//     InputLabel,
//     ListItemText,
//     MenuItem,
//     Select,
//   } from "@mui/material";
//   import {
//     Calendar,
//     Views,
//     DateLocalizer,
//     momentLocalizer,
//   } from "react-big-calendar";
//   import dayjs from "dayjs";
//   import moment from "moment";
  
//   import "react-big-calendar/lib/css/react-big-calendar.css";
//   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//   import {
//     faCalendarPlus,
//     faClock,
//     faUser,
//   } from "@fortawesome/free-solid-svg-icons";
//   import AddEvent from "./AddEvent";
//   import TimeSelect from "../../Components/TimeSlots";
//   import { createEvent } from "@testing-library/react";
//   import axios from "axios";
//   import UnavailableEvent from "../../Components/UnavailableEvent";
//   import UserBooking from "../../Components/UserBooking";
//   import InternelEvent from "../../Components/InternelEvent";
//   import Cookies from "universal-cookie";
  
//   const localizer = momentLocalizer(moment);
  
//   // const resource = [
//   //   { resourceId: 1, resourcePrice: 3000, resourceTitle: "Padel Court 1" },
//   //   { resourceId: 2, resourcePrice: 3500, resourceTitle: "Padel Court 2" },
//   //   { resourceId: 3, resourcePrice: 3000, resourceTitle: "Padel Court 3" },
//   //   { resourceId: 4, resourcePrice: 3000, resourceTitle: "Padel Court 4" },
//   //   { resourceId: 5, resourcePrice: 3000, resourceTitle: "Padel Court 5" },
//   //   { resourceId: 6, resourcePrice: 3000, resourceTitle: "Cricket ( 9-aside )" },
//   //   { resourceId: 7, resourcePrice: 2000, resourceTitle: "Cricket ( 7-aside )" },
//   //   {
//   //     resourceId: 8,
//   //     resourcePrice: 4000,
//   //     resourceTitle: "Super Sunday ( 7-aside )",
//   //   },
//   // ];
  
//   export default function Resource() {
//     const [open, setOpen] = useState(false);
//     const cancelButtonRef = useRef(null);
//     const [events, setEvents] = useState([]);
//     const [showHeader, setShowHeader] = useState(false);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [resource, setResource] = useState([]);
//     const [newEvent, setNewEvent] = useState({
//       date: "",
//       title: "",
//       start: "",
//       end: "",
//       resourceId: "",
//       price: "",
//       paymentStatus: "",
//       // user:"",
//     });
//     const cookies = new Cookies();
//     const [currentView, setCurrentView] = useState(Views.DAY); // Default to day view
  
//     const closeHeader = () => {
//       setShowHeader(false);
//       setSelectedEvent(null);
//       if (events && events.length > 0) {
//         const updatedEvents = [...events]; // Create a copy of the array
//         updatedEvents.pop(); // Remove the last element
//         setEvents(updatedEvents);
//       }
//     };
  
//     const [personName, setPersonName] = React.useState([]);
//     const ITEM_HEIGHT = 40;
//     const ITEM_PADDING_TOP = 1;
//     const MenuProps = {
//       PaperProps: {
//         style: {
//           maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
//           width: 250,
//         },
//       },
//     };
  
//     // Function to convert time from AM/PM format to 24-hour format
//     const convertTo24Hour = (time12h) => {
//       const [time, modifier] = time12h.split(" ");
//       let [hours, minutes] = time.split(":");
//       if (hours === "12") {
//         hours = "00";
//       }
//       if (modifier === "PM") {
//         hours = parseInt(hours, 10) + 12;
//       }
//       return `${hours}:${minutes}`;
//     };
  
//     const CreateEvent = async () => {
//       // Extract year, month, and day from the date string
//       const [year, month, day] = newEvent.date.split("-").map(Number);
  
//       // Extract start hour and minute from the start time string
//       const [startHour, startMinute] = newEvent.start.split(":").map(Number);
  
//       // Extract end hour and minute from the end time string
//       const [endHour, endMinute] = newEvent.end.split(":").map(Number);
  
//       // Create Date objects for start and end times
//       const startDate = new Date(year, month - 1, day, startHour, startMinute);
//       const endDate = new Date(year, month - 1, day, endHour, endMinute);
  
//       // Update the newEvent object with the Date objects
//       const updatedEvent = {
//         ...newEvent,
//         start: startDate,
//         end: endDate,
//       };
  
//       // try {
//       //   const { date, title, start, end, resourceId, price, paymentStatus } =
//       //     newEvent;
//       //   if (!date || !title || !start || !end || !resourceId || !price) {
//       //     window.alert("Please enter all fields");
//       //     return;
//       //   }
//       //   const urlEncodedData = new URLSearchParams(newEvent).toString(); // Serialize data to URL-encoded string
  
//       //   const response = await axios.post(
//       //     `http://localhost:3000/api/event/add?${urlEncodedData}`,
//       //     {},
//       //     {
//       //       headers: {
//       //         'Content-Type': 'application/x-www-form-urlencoded',
//       //       },
//       //       withCredentials: true, // Include credentials if needed
//       //     }
//       //   );
  
//       //   console.log(response);
//       // } catch (err) {
//       //   console.log(err);
//       //   alert(err);
//       // }
//       // Push the updated event to the events array
//       const updatedEvents = [...events, updatedEvent];
//       setEvents(updatedEvents);
  
//       // Optional: Log the updated events array for verification
//       console.log(events);
//     };
  
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_BASE_URL}/event/list`
//         );
//         const result = await response.json();
//         console.log(result);
//         if (response.status === 200) {
//           const modifiedEvents = result.map((event) => ({
//             ...event,
//             end: new Date(event.end),
//             start: new Date(event.start), // Convert start to a Date object
//           }));
//           setEvents(modifiedEvents);
//         } else {
//           console.log("error");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
  
//     const getSpaces = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/space/list`,
//           {
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             withCredentials: true,
//           }
//         );
//         console.log(response);
//         if (response.status === 201) {
//           setResource(response.data);
//           // setSelectedSpace(spaces[0])
//         }
//       } catch (error) {
//         alert("An error occurred while fetching spaces");
//       }
//     };
  
//     useEffect(() => {
//       fetchData();
//       getSpaces();
//       console.log(events);
//     }, []);
  
//     const handleChange = (event) => {
//       const {
//         target: { value },
//       } = event;
//       setPersonName(
//         // On autofill we get a stringified value.
//         typeof value === "string" ? value.split(",") : value
//       );
//     };
  
//     const Booked = () => {
//       setOpen(true);
//       // setShowHeader(false);
//       // Assuming the provided data is in an object named 'data'
  
//       setNewEvent({
//         ...newEvent,
//         start: new Date(selectedEvent.start).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         end: new Date(selectedEvent.end).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         resourceId: selectedEvent.resourceId,
//       });
//     };
  
//     const handleSelectSlot = useCallback(
//       ({ start, end, resourceId, event }) => {
//         const isSlotEmpty = events.every((event) => {
//           const eventStart = new Date(event.start);
//           const eventEnd = new Date(event.end);
//           return (
//             !(
//               (start >= eventStart && start < eventEnd) ||
//               (end > eventStart && end <= eventEnd) ||
//               (start <= eventStart && end >= eventEnd)
//             ) || event.resourceId !== resourceId
//           );
//         });
  
//         if (!isSlotEmpty) {
//           window.alert("An event already exists at this time and resource.");
//           return;
//         }
//         const title = window.prompt("New Event name");
//         console.log("Title:", title);
//         if (title) {
//           const newEvent = {
//             start: new Date(start),
//             end: new Date(end),
//             // title,
//             resourceId,
//           };
//           console.log("New Event:", newEvent);
//           setSelectedEvent(newEvent);
//           setShowHeader(true);
//           setEvents((prev) => [...prev, newEvent]);
//         }
//       },
//       [setEvents, events]
//     );
  
//     const CustomMonthEvent = ({ event }) => {
//       const startTime = moment(event.start).format("h:mm A");
//       const endTime = moment(event.end).format("h:mm A");
//       // Implement your custom month event display here
//       return (
//         <div>
//           <p className="custum-month">
//             {startTime}-{endTime}
//           </p>
//           {/* Additional event details */}
//         </div>
//       );
//     };
  
//     const CustomPopup = ({ event }) => {
//       const startTime = moment(event.start).format("h:mm A");
//       const endTime = moment(event.end).format("h:mm A");
//       return (
//         // Custom popup JSX
//         <div className="">
//           <p>{/* {startTime}-{endTime} */}</p>
//           {/* Additional event details */}
//         </div>
//       );
//     };
  
//     const CustomEventWrapper = ({ event }) => {
//       const [showTooltip, setShowTooltip] = useState(false);
  
//       const toggleTooltip = () => {
//         setShowTooltip(!showTooltip);
//       };
  
//       if (event.type === "user") {
//         return <UserBooking myObject={event} />;
//       } else if (event.type === "not_availabel") {
//         return <UnavailableEvent myObject={event} />;
//       } else if (event.type === "internel") {
//         return <InternelEvent myObject={event} />;
//       }
//     };
  
//     const components = {
//       event: CustomEventWrapper,
//       month: {
//         // Custom event component for month view
//         event: CustomMonthEvent,
//       },
//     };
  
//     const handleSelectEvent = useCallback(
//       (event) => window.alert(event.view),
//       []
//     );
  
//     const { defaultDate, scrollToTime } = useMemo(
//       () => ({
//         defaultDate: new Date(2024, 3, 17),
//         scrollToTime: new Date(1970, 1, 1, 6),
//       }),
//       []
//     );
  
//     const slotStyleGetter = (date, resourceId, isSelected) => {
//       const isSlotEmpty = events.every((event) => {
//         const eventStart = new Date(event.start);
//         const eventEnd = new Date(event.end);
//         return !(
//           (date >= eventStart && date < eventEnd) ||
//           (date <= eventStart && date >= eventEnd)
//         );
//       });
  
//       if (isSlotEmpty) {
//         return {
//           className: "hoverable-slot",
//         };
//       }
  
//       return {};
//     };
  
//     const CustomEvent = ({ event }) => (
//       <div>
//         <strong>{event.title}</strong>
//         <div>{event.description}</div>
//         {/* Add additional content here */}
//         <div>Custom Content</div>
//       </div>
//     );
  
//     const monthEventStyle = {
//       className: "custum-month", // CSS class for month view events
//     };
  
//     const dayEventStyle = {
//       className: "day-event", // CSS class for day view events
//     };
  
//     const customStyle = {
//       background: "red", // Background color for the selected slot
//       borderRadius: "4px",
//       opacity: "0.5", // Adjust opacity if needed
//     };
  
//     const selecting = (event) => {
//       let price;
//       if (currentView === Views.DAY) {
//         setSelectedEvent(event);
//         if (!selectedItems.includes(event.resourceId)) {
//           // If the array has reached its maximum size, remove the first element
//           if (selectedItems && selectedItems.length >= 1) {
//             selectedItems.shift(); // Remove the first element
//           }
//           // Push the new resourceId into the selectedItems array
//           selectedItems.push(event.resourceId);
//         }
//         const selectedResource = resource.find(
//           (resource) => resource.resourceId === event.resourceId
//         );
  
//         if (selectedResource) {
//           price = selectedResource.resourcePrice;
//         } else {
//           price = 0;
//         }
//         const startDate = new Date(event.start);
//         const year = startDate.getFullYear();
//         const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it starts from 0
//         const day = String(startDate.getDate()).padStart(2, "0");
//         const formattedDate = `${year}-${month}-${day}`;
  
//         console.log(formattedDate);
  
//         // setSelectedEvent({
//         //   ...selectedEvent,
//         //   date: formattedDate,
//         // })
  
//         setNewEvent({
//           ...newEvent,
//           price: price,
//           resourceId: event.resourceId,
//           date: formattedDate,
//         });
//         console.log(event);
//         setShowHeader(true);
//       }
//       return;
//     };
  
//     const getEventData = (e) => {
//       const { name, value } = e.target;
//       setNewEvent({ ...newEvent, [name]: value });
//       console.log(newEvent);
//     };
  
//     const MakeBooking = async (e) => {
//       e.preventDefault();
//       const {
//         date,
//         title,
//         start,
//         end,
//         resourceId,
//         type,
//         price,
//         paymentStatus,
//         userID,
//       } = newEvent;
  
//       let data;
//       if (date && title && start && end && resourceId && type) {
//         console.log(newEvent);
  
//         // Extract year, month, and day from the date string
//         const [year, month, day] = newEvent.date.split("-").map(Number);
  
//         // Convert start and end times to 24-hour format
//         const [startHour, startMinute] = convertTo24Hour(newEvent.start)
//           .split(":")
//           .map(Number);
//         const [endHour, endMinute] = convertTo24Hour(newEvent.end)
//           .split(":")
//           .map(Number);
  
//         // Create Date objects for start and end times
//         const startDate = new Date(year, month - 1, day, startHour, startMinute);
//         const endDate = new Date(year, month - 1, day, endHour, endMinute);
//         try {
//           const token = cookies.get("authorization");
//           console.log(token);
//           const params = new URLSearchParams();
//           params.append("date", date);
//           params.append("title", title);
//           params.append("start", startDate);
//           params.append("end", endDate);
//           // params.append("resourceId", resourceId);
//           params.append("type", type);
//           params.append("price", price);
//           params.append("paymentStatus", paymentStatus);
//           params.append("userID", userID);
//           resourceId.forEach((id) => params.append("resourceId", id));
  
//           const response = await axios.post(
//             `${process.env.REACT_APP_BASE_URL}/booking`,
//             params,
//             {
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Authorization: `${token}`,
//               },
//               withCredentials: true,
//             }
//           );
//           console.log(response);
//           data = response.data;
//           console.log(data);
//           if (response && response.status === 201) {
//             const AddEvent = {
//               ...newEvent,
//               start: startDate,
//               end: endDate,
//             };
//             const updatedEvents = [...events, AddEvent];
//             setEvents(updatedEvents);
//             closeDailog();
//           }
//         } catch (error) {
//           if (error && error.response.status === 401) {
//             // setErrMsg(
//             //   "Sorry, your login credentials are not correct. Please double-check your email and password. You can use the login-reset feature if you have forgotten your password."
//             // );
//             // setLoading(false);
//             // setError(true);
//             console.log(error);
//             return;
//           } else if (error && error.response.status === 403) {
//             // setErrMsg("Internel Server Error");
//             // setLoading(false);
//             // setError(true);
//             alert("Please Login First");
//             console.log(error);
//             return;
//           } else if (error && error.response.status === 500) {
//             // setErrMsg("Internel Server Error");
//             // setLoading(false);
//             // setError(true);
//             console.log(error);
//             return;
//           } else {
//             alert("Please Check your Internet Connection and Try Again");
//             // setLoading(false);
//             // setError(true);
//             console.log(error);
//             return;
//           }
//         }
//       } else {
//         // setErrMsg("Please Enter Email and Password to Continue");
//         // setLoading(false);
//         // setError(true);
//         // console.log(error);
//         return;
//       }
//     };
  
//     // const eventPropGetter = () => {
//     //   if (currentView === Views.DAY) {
//     //     return dayEventStyle; // Example style for day view events
//     //   } else if (currentView === Views.MONTH) {
//     //     return CustomEvent; // Example style for month view events
//     //   }
//     // };
  
//     const handleCheckboxChange = (item) => {
//       const selectedIndex = selectedItems.indexOf(item.resourceId);
//       let newSelectedItems = [...selectedItems];
  
//       if (selectedIndex === -1) {
//         // Checkbox is checked
//         newSelectedItems.push(item.resourceId);
//       } else {
//         // Checkbox is unchecked
//         newSelectedItems.splice(selectedIndex, 1);
//       }
  
//       setSelectedItems(newSelectedItems);
  
//       // Calculate total price of selected resources
//       // const totalPrice = newSelectedItems.reduce((accumulator, resourceId) => {
//       //   const selectedResource = resource.find(resource => resource.resourceId === resourceId);
//       //   return accumulator + (selectedResource ? selectedResource.resourcePrice : 0);
//       // }, 0);
  
//       // Update newEvent with total price
//       setNewEvent((prevEvent) => ({
//         ...prevEvent,
//         resourceId: newSelectedItems,
//         // totalPrice: totalPrice
//       }));
//     };
  
//     const closeDailog = () => {
//       setOpen(false);
//       setShowHeader(false);
//       setSelectedItems([]);
//       setNewEvent({
//         date: "",
//         title: "",
//         start: "",
//         end: "",
//         resourceId: "",
//         price: "",
//         paymentStatus: "",
//       });
//     };
  
//     const handleViewChange = (view) => {
//       console.log(view, ">>");
//       setCurrentView(view);
//     };
  
//     useEffect(() => {
//       const totalPrice = selectedItems.reduce((accumulator, resourceId) => {
//         const selectedResource = resource.find(
//           (resource) => resource.resourceId === resourceId
//         );
//         return (
//           accumulator + (selectedResource ? selectedResource.resourcePrice : 0)
//         );
//       }, 0);
  
//       // Update newEvent's resourceId based on selectedItems whenever selectedItems change
//       setNewEvent((prevEvent) => ({
//         ...prevEvent,
//         price: totalPrice,
//         resourceId: selectedItems,
//       }));
//     }, [selectedItems]);
  
//     // const eventPropGetter = useCallback(
//     //   (event, start, end, isSelected) => ({
//     //     ...(isSelected && {
//     //       className: "selected"
//     //     }),
//     //     ...(moment(start).hour() < 12 && {
//     //       className: 'powderBlue',
//     //     }),
//     //     ...(event.title.includes('Meeting') && {
//     //       className: 'darkGreen',
//     //     }),
//     //   }),
//     //   []
//     // )
//     return (
//       <Fragment>
//         <Transition.Root show={open} as={Fragment}>
//           <Dialog
//             as="div"
//             className="relative z-10"
//             initialFocus={cancelButtonRef}
//             onClose={closeDailog}
//           >
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//             </Transition.Child>
  
//             <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 max-w-5xl">
//                     <div className="">
//                       <div className=" bg-white w-full">
//                         <div className="w-full ">
//                           <div className="">
//                             <div className="border">
//                               <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
//                                 NEW BOOKING
//                               </h1>
//                               <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3 ">
//                                 <div className="my-2 mt-4">
//                                   <label
//                                     className="text-sm"
//                                     for="exampleInputEmail1"
//                                   >
//                                     DATE AND TIME
//                                   </label>
//                                   <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4 my-3">
//                                     <div className="space-y-2">
//                                       <div>
//                                         <input
//                                           type="date"
//                                           name="date"
//                                           value={newEvent.date}
//                                           onChange={getEventData}
//                                           class="form-control rounded-0"
//                                           placeholder="e.g Sally"
//                                           aria-label="Recipient's username"
//                                           aria-describedby="basic-addon2"
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className=" grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
//                                       <div>
//                                         <select
//                                           className="form-control rounded-0"
//                                           name="start"
//                                           value={newEvent && newEvent.start}
//                                           onChange={getEventData}
//                                         >
//                                           <option
//                                             value={newEvent && newEvent.start}
//                                           >
//                                             {newEvent && newEvent.start}
//                                           </option>
//                                           <option value="12:00 AM">
//                                             12:00 AM
//                                           </option>
//                                           <option value="12:30 AM">
//                                             12:30 AM
//                                           </option>
//                                           <option value="1:00 AM">1:00 AM</option>
//                                           <option value="1:30 AM">1:30 AM</option>
//                                           <option value="2:00 AM">2:00 AM</option>
//                                           <option value="2:30 AM">2:30 AM</option>
//                                           <option value="3:00 AM">3:00 AM</option>
//                                           <option value="3:30 AM">3:30 AM</option>
//                                           <option value="4:00 AM">4:00 AM</option>
//                                           <option value="4:30 AM">4:30 AM</option>
//                                           <option value="5:00 AM">5:00 AM</option>
//                                           <option value="5:30 AM">5:30 AM</option>
//                                           <option value="6:00 AM">6:00 AM</option>
//                                           <option value="6:30 AM">6:30 AM</option>
//                                           <option value="7:00 AM">7:00 AM</option>
//                                           <option value="7:30 AM">7:30 AM</option>
//                                           <option value="8:00 AM">8:00 AM</option>
//                                           <option value="8:30 AM">8:30 AM</option>
//                                           <option value="9:00 AM">9:00 AM</option>
//                                           <option value="9:30 AM">9:30 AM</option>
//                                           <option value="10:00 AM">
//                                             10:00 AM
//                                           </option>
//                                           <option value="10:30 AM">
//                                             10:30 AM
//                                           </option>
//                                           <option value="11:00 AM">
//                                             11:00 AM
//                                           </option>
//                                           <option value="11:30 AM">
//                                             11:30 AM
//                                           </option>
//                                           <option value="12:00 PM">
//                                             12:00 PM
//                                           </option>
//                                           <option value="12:30 PM">
//                                             12:30 PM
//                                           </option>
//                                           <option value="1:00 PM">1:00 PM</option>
//                                           <option value="1:30 PM">1:30 PM</option>
//                                           <option value="2:00 PM">2:00 PM</option>
//                                           <option value="2:30 PM">2:30 PM</option>
//                                           <option value="3:00 PM">3:00 PM</option>
//                                           <option value="3:30 PM">3:30 PM</option>
//                                           <option value="4:00 PM">4:00 PM</option>
//                                           <option value="4:30 PM">4:30 PM</option>
//                                           <option value="5:00 PM">5:00 PM</option>
//                                           <option value="5:30 PM">5:30 PM</option>
//                                           <option value="6:00 PM">6:00 PM</option>
//                                           <option value="6:30 PM">6:30 PM</option>
//                                           <option value="7:00 PM">7:00 PM</option>
//                                           <option value="7:30 PM">7:30 PM</option>
//                                           <option value="8:00 PM">8:00 PM</option>
//                                           <option value="8:30 PM">8:30 PM</option>
//                                           <option value="9:00 PM">9:00 PM</option>
//                                           <option value="9:30 PM">9:30 PM</option>
//                                           <option value="10:00 PM">
//                                             10:00 PM
//                                           </option>
//                                           <option value="10:30 PM">
//                                             10:30 PM
//                                           </option>
//                                           <option value="11:00 PM">
//                                             11:00 PM
//                                           </option>
//                                           <option value="11:30 PM">
//                                             11:30 PM
//                                           </option>
//                                         </select>
//                                       </div>
//                                       <div>
//                                         <select
//                                           className="form-control rounded-0"
//                                           value={newEvent && newEvent.end}
//                                           onChange={getEventData}
//                                           name="end"
//                                         >
//                                           <option
//                                             value={newEvent && newEvent.end}
//                                           >
//                                             {newEvent && newEvent.end}
//                                           </option>
//                                           <option value="12:00 AM">
//                                             12:00 AM
//                                           </option>
//                                           <option value="12:30 AM">
//                                             12:30 AM
//                                           </option>
//                                           <option value="1:00 AM">1:00 AM</option>
//                                           <option value="1:30 AM">1:30 AM</option>
//                                           <option value="2:00 AM">2:00 AM</option>
//                                           <option value="2:30 AM">2:30 AM</option>
//                                           <option value="3:00 AM">3:00 AM</option>
//                                           <option value="3:30 AM">3:30 AM</option>
//                                           <option value="4:00 AM">4:00 AM</option>
//                                           <option value="4:30 AM">4:30 AM</option>
//                                           <option value="5:00 AM">5:00 AM</option>
//                                           <option value="5:30 AM">5:30 AM</option>
//                                           <option value="6:00 AM">6:00 AM</option>
//                                           <option value="6:30 AM">6:30 AM</option>
//                                           <option value="7:00 AM">7:00 AM</option>
//                                           <option value="7:30 AM">7:30 AM</option>
//                                           <option value="8:00 AM">8:00 AM</option>
//                                           <option value="8:30 AM">8:30 AM</option>
//                                           <option value="9:00 AM">9:00 AM</option>
//                                           <option value="9:30 AM">9:30 AM</option>
//                                           <option value="10:00 AM">
//                                             10:00 AM
//                                           </option>
//                                           <option value="10:30 AM">
//                                             10:30 AM
//                                           </option>
//                                           <option value="11:00 AM">
//                                             11:00 AM
//                                           </option>
//                                           <option value="11:30 AM">
//                                             11:30 AM
//                                           </option>
//                                           <option value="12:00 PM">
//                                             12:00 PM
//                                           </option>
//                                           <option value="12:30 PM">
//                                             12:30 PM
//                                           </option>
//                                           <option value="1:00 PM">1:00 PM</option>
//                                           <option value="1:30 PM">1:30 PM</option>
//                                           <option value="2:00 PM">2:00 PM</option>
//                                           <option value="2:30 PM">2:30 PM</option>
//                                           <option value="3:00 PM">3:00 PM</option>
//                                           <option value="3:30 PM">3:30 PM</option>
//                                           <option value="4:00 PM">4:00 PM</option>
//                                           <option value="4:30 PM">4:30 PM</option>
//                                           <option value="5:00 PM">5:00 PM</option>
//                                           <option value="5:30 PM">5:30 PM</option>
//                                           <option value="6:00 PM">6:00 PM</option>
//                                           <option value="6:30 PM">6:30 PM</option>
//                                           <option value="7:00 PM">7:00 PM</option>
//                                           <option value="7:30 PM">7:30 PM</option>
//                                           <option value="8:00 PM">8:00 PM</option>
//                                           <option value="8:30 PM">8:30 PM</option>
//                                           <option value="9:00 PM">9:00 PM</option>
//                                           <option value="9:30 PM">9:30 PM</option>
//                                           <option value="10:00 PM">
//                                             10:00 PM
//                                           </option>
//                                           <option value="10:30 PM">
//                                             10:30 PM
//                                           </option>
//                                           <option value="11:00 PM">
//                                             11:00 PM
//                                           </option>
//                                           <option value="11:30 PM">
//                                             11:30 PM
//                                           </option>
//                                         </select>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="mb-2">
//                                   <FormControl sx={{ width: "100%" }}>
//                                     <label
//                                       className="text-sm my-2  "
//                                       for="exampleInputEmail1"
//                                     >
//                                       SPACES
//                                     </label>
//                                     <Select
//                                       labelId="select-multiple-checkbox-label"
//                                       id="select-multiple-checkbox"
//                                       multiple
//                                       size="small"
//                                       value={selectedItems}
//                                       onChange={(e) =>
//                                         setSelectedItems(e.target.value)
//                                       }
//                                       renderValue={(selected) => (
//                                         <div className="flex flex-wrap">
//                                           {resource
//                                             .filter((item) =>
//                                               selected.includes(item._id)
//                                             )
//                                             .map((item) => (
//                                               <div key={item._id} className="m-1">
//                                                 {item.name}
//                                               </div>
//                                             ))}
//                                         </div>
//                                       )}
//                                     >
//                                       {resource.map((item) => (
//                                         <MenuItem
//                                           key={item._id}
//                                           value={item._id}
//                                           className="p-0 "
//                                         >
//                                           <Checkbox
//                                             checked={selectedItems.includes(
//                                               item._id
//                                             )}
//                                             onChange={() =>
//                                               handleCheckboxChange(item)
//                                             }
//                                             className=""
//                                             size="small"
//                                           />
//                                           {item.name}
//                                         </MenuItem>
//                                       ))}
//                                     </Select>
//                                   </FormControl>
//                                 </div>
//                                 <div className="my-2">
//                                   <label
//                                     className="text-sm "
//                                     for="exampleInputEmail1"
//                                   >
//                                     HOLDER
//                                   </label>
//                                   <div>
//                                     <select
//                                       className="input-field w-100 p-2 my-2 border bg-white"
//                                       name="nature"
//                                       aria-label=".form-select-lg example"
//                                     >
//                                       <option value="">
//                                         Users From Background
//                                       </option>
//                                     </select>
//                                   </div>
//                                 </div>
//                                 <div className="my-2">
//                                   <label
//                                     className="text-sm my-2"
//                                     for="exampleInputEmail1"
//                                   >
//                                     BOOKING TITLE
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="title"
//                                     onChange={getEventData}
//                                     class="form-control rounded-0"
//                                     placeholder="An Optional Booking Summary"
//                                     aria-label="Recipient's username"
//                                     aria-describedby="basic-addon2"
//                                   />
//                                 </div>
//                                 <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 my-3 space-x-4">
//                                   <div className="">
//                                     <label
//                                       className="text-sm"
//                                       for="exampleInputEmail1"
//                                     >
//                                       Price
//                                     </label>
//                                     <div className="bg-gray-300 flex text-center my-2 justify-center items-center">
//                                       <p className="p-2 ">Rs</p>
//                                       <input
//                                         type="number"
//                                         class="form-control rounded-0"
//                                         onChange={getEventData}
//                                         name="price"
//                                         value={
//                                           newEvent && newEvent.price
//                                             ? newEvent.price
//                                             : ""
//                                         }
//                                         placeholder="00"
//                                         readOnly
//                                         aria-label="Recipient's username"
//                                         aria-describedby="basic-addon2"
//                                       />
//                                       <p className="p-2 ">PKR</p>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <label
//                                       className="text-sm"
//                                       for="exampleInputEmail1"
//                                     >
//                                       Payment Status
//                                     </label>
//                                     <select className="form-control rounded-0 my-2">
//                                       <option value="paid">Paid</option>
//                                       <option value="Un paid">Un Paid</option>
//                                       <option value="No Status">Status</option>
//                                     </select>
//                                   </div>
//                                 </div>
//                                 <div className="flex space-x-3 my-3">
//                                   <button
//                                     className="border p-2 px-3 text-sm text-white  "
//                                     style={{ backgroundColor: "#00A176" }}
//                                     onClick={MakeBooking}
//                                   >
//                                     Confirm Booking
//                                   </button>
//                                   <button
//                                     onClick={closeDailog}
//                                     className="border p-2 px-3 text-sm hover:bg-gray-200"
//                                     ref={cancelButtonRef}
//                                   >
//                                     Cancel Booking
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition.Root>
//         {showHeader && (
//           <div className="flex bg-gray-100 space-x-3 p-1">
//             <div className="border p-2  flex justify-center items-center border-l">
//               <FontAwesomeIcon className="h-6 mr-3" icon={faCalendarPlus} />
//               {newEvent && newEvent.date && newEvent.date}
//             </div>
//             <div className="border p-2  flex justify-center items-center border-l">
//               <FontAwesomeIcon className="h-6 mr-3" icon={faClock} />
//               {moment(selectedEvent && selectedEvent.start).format(
//                 "h:mm A"
//               )} - {moment(selectedEvent && selectedEvent.end).format("h:mm A")}
//             </div>
//             <div className="border p-2  flex justify-center items-center">
//               {selectedEvent && selectedEvent.end && (
//                 <div>
//                   {resource.map((space) => {
//                     if (space._id === selectedEvent.resourceId) {
//                       return <p key={space._id}>{space.name}</p>;
//                     }
//                   })}
//                   {!resource.find(
//                     (space) => space._id === selectedEvent.resourceId
//                   ) && <p>Unknown Resource</p>}
//                 </div>
//               )}
//             </div>
  
//             <div className="border p-2  flex justify-center items-center">
//               {newEvent && newEvent.price}
//             </div>
//             <div className="border p-2  flex justify-center items-center bg-green-400 text-white px-4">
//               <button onClick={Booked}>Book</button>
//             </div>
//             <div className="border p-2  flex justify-center items-center">
//               <button onClick={closeHeader}>Cancle</button>
//             </div>
//           </div>
//         )}
//         {/* <div className="height600"> */}
//         <Calendar
//           defaultDate={defaultDate}
//           defaultView={Views.DAY}
//           events={events}
//           localizer={localizer}
//           resourceIdAccessor="_id"
//           resources={resource}
//           resourceTitleAccessor="name"
//           step={30}
//           onSelectEvent={handleSelectEvent}
//           onSelectSlot={selecting}
//           onSelecting={selecting}
//           components={components}
//           selectable
//           popup={CustomPopup}
//           scrollToTime={scrollToTime}
//           // eventPropGetter={eventPropGetter}
//           views={["day", "month", "agenda"]}
//           slotPropGetter={slotStyleGetter}
//           onView={(view) => handleViewChange(view)} // Update current view when it changes
//         />
//         {/* </div>s */}
//       </Fragment>
//     );
//   }
  
//   Resource.propTypes = {
//     localizer: PropTypes.instanceOf(DateLocalizer),
//   };
  