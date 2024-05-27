// import React, { useState } from "react";
// import InputBase from "@mui/material/InputBase";
// import { styled } from "@mui/material/styles";
// import { Delete } from "@mui/icons-material";
// import {
//   Checkbox,
//   FormControl,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   Select,
// } from "@mui/material";

// export default function ConditionsBooking() {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedResource, setSelectedResource] = useState([]);
//   const [conditionsBooking, setConditionsBooking] = useState([]);

//   const resourceMap = [
//     {
//       resourceId: 1,
//       resourcePrice: 3000,
//       resourceTitle: "Padel Court 1",
//       availability: { start: "00:00", end: "20:00" },
//     },
//     {
//       resourceId: 2,
//       resourcePrice: 3500,
//       resourceTitle: "Padel Court 2",
//       availability: { start: "00:00", end: "22:00" },
//     },
//     {
//       resourceId: 3,
//       resourcePrice: 3000,
//       resourceTitle: "Padel Court 3",
//       availability: { start: "00:00", end: "20:00" },
//     },
//     {
//       resourceId: 4,
//       resourcePrice: 3000,
//       resourceTitle: "Padel Court 4",
//       availability: { start: "00:00", end: "20:00" },
//     },
//     {
//       resourceId: 5,
//       resourcePrice: 3000,
//       resourceTitle: "Padel Court 5",
//       availability: { start: "00:00", end: "20:00" },
//     },
//     {
//       resourceId: 6,
//       resourcePrice: 3000,
//       resourceTitle: "Cricket ( 9-aside )",
//       availability: { start: "00:00", end: "20:00" },
//     },
//     {
//       resourceId: 7,
//       resourcePrice: 2000,
//       resourceTitle: "Cricket ( 7-aside )",
//       availability: { start: "00:00", end: "20:00" },
//     },
//     {
//       resourceId: 8,
//       resourcePrice: 4000,
//       resourceTitle: "Super Sunday ( 7-aside )",
//       start: new Date().setHours(11, 0, 0), // 12pm
//       end: new Date().setHours(23, 0, 0),
//     },
//   ];

//   const handleAddRule = () => {
//     const newRule = {
//       resourceId: conditionsBooking.length + 1,
//       resourcePrice: 4000,
//       resourceTitle: "Super Sunday ( 7-aside )",
//       start: new Date().setHours(11, 0, 0),
//       end: new Date().setHours(23, 0, 0),
//     };
//     setConditionsBooking([...conditionsBooking, newRule]);
//   };

//   const handleCheckboxChange = (item) => {
//     const selectedIndex = selectedResource.indexOf(item.resourceId);
//     let newSelectedResource = [...selectedResource];

//     if (selectedIndex === -1) {
//       newSelectedResource.push(item.resourceId);
//     } else {
//       newSelectedResource.splice(selectedIndex, 1);
//     }

//     setSelectedResource(newSelectedResource);
//   };

//   const [newRule, setNewRule] = useState({
//     no: "",
//     resources: [],
//     from: [],
//     to: [],
//     days: [],
//   });

//   const BootstrapInput = styled(InputBase)(({ theme }) => ({
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//     "& .MuiInputBase-input": {
//       borderRadius: "0px",
//       fontSize: 12,
//       padding: "0px",
//       transition: theme.transitions.create(["border-color", "box-shadow"]),
//       fontFamily: [
//         "-apple-system",
//         "BlinkMacSystemFont",
//         '"Segoe UI"',
//         "Roboto",
//         '"Helvetica Neue"',
//         "Arial",
//         "sans-serif",
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//       ].join(","),
//     },
//   }));

//   return (
//     <div>
//       <div className="px-3 my-5">
//         <h3 className="text-xl font-semibold">HOURS OF AVAILABILITY</h3>
//         <p className="text-md text-gray-600 my-3">
//           These are your venue's broad "opening hours". Times outside of these
//           hours will be displayed in a darker shade of gray on your scheduler
//           and won't be bookable by users.
//         </p>
//         {conditionsBooking.map((rule) => (
//           <div
//             key={rule.resourceId}
//             className="text-md my-3 p-3 bg-gray-200 flex justify-between"
//           >
//             <div>
//               <Select
//                 style={{
//                   backgroundColor: "transparent",
//                   maxHeight: "20px",
//                   overflowY: "hidden",
//                   border: "none",
//                   maxWidth: "500px",
//                 }}
//                 input={<BootstrapInput />}
//                 labelId="select-multiple-checkbox-label"
//                 id="select-multiple-checkbox"
//                 multiple
//                 size="small"
//                 value={selectedResource}
//                 onChange={(e) => setSelectedItems(e.target.value)}
//                 renderValue={(selected) => (
//                   <div
//                     className="flex flex-wrap"
//                     style={{
//                       overflow: "hidden",
//                       whiteSpace: "nowrap",
//                       textOverflow: "ellipsis",
//                       maxWidth: "200px",
//                     }}
//                   >
//                     {resourceMap
//                       .filter((item) => selected.includes(item.resourceId))
//                       .map((item) => (
//                         <div key={item.resourceId} className="mx-1">
//                           {item.resourceTitle}
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               >
//                 {resourceMap.map((item) => (
//                   <MenuItem
//                     key={item.resourceId}
//                     value={item.resourceId}
//                     className="p-0"
//                   >
//                     <Checkbox
//                       checked={selectedResource.includes(item.resourceId)}
//                       onChange={() => handleCheckboxChange(item)}
//                       className=""
//                       size="small"
//                     />
//                     {item.resourceTitle}
//                   </MenuItem>
//                 ))}
//               </Select>
//               is available between
//               <select className="bg-transparent theme-color" name="start">
//                 <option value="12:00 AM">12:00 AM</option>
//                 <option value="12:30 AM">12:30 AM</option>
//                 <option value="1:00 AM">1:00 AM</option>
//                 <option value="1:30 AM">1:30 AM</option>
//                 <option value="2:00 AM">2:00 AM</option>
//                 <option value="2:30 AM">2:30 AM</option>
//                 <option value="3:00 AM">3:00 AM</option>
//                 <option value="3:30 AM">3:30 AM</option>
//                 <option value="4:00 AM">4:00 AM</option>
//                 <option value="4:30 AM">4:30 AM</option>
//                 <option value="5:00 AM">5:00 AM</option>
//                 <option value="5:30 AM">5:30 AM</option>
//                 <option value="6:00 AM">6:00 AM</option>
//                 <option value="6:30 AM">6:30 AM</option>
//                 <option value="7:00 AM">7:00 AM</option>
//                 <option value="7:30 AM">7:30 AM</option>
//                 <option value="8:00 AM">8:00 AM</option>
//                 <option value="8:30 AM">8:30 AM</option>
//                 <option value="9:00 AM">9:00 AM</option>
//                 <option value="9:30 AM">9:30 AM</option>
//                 <option value="10:00 AM">10:00 AM</option>
//                 <option value="10:30 AM">10:30 AM</option>
//                 <option value="11:00 AM">11:00 AM</option>
//                 <option value="11:30 AM">11:30 AM</option>
//                 <option value="12:00 PM">12:00 PM</option>
//                 <option value="12:30 PM">12:30 PM</option>
//                 <option value="1:00 PM">1:00 PM</option>
//                 <option value="1:30 PM">1:30 PM</option>
//                 <option value="2:00 PM">2:00 PM</option>
//                 <option value="2:30 PM">2:30 PM</option>
//                 <option value="3:00 PM">3:00 PM</option>
//                 <option value="3:30 PM">3:30 PM</option>
//                 <option value="4:00 PM">4:00 PM</option>
//                 <option value="4:30 PM">4:30 PM</option>
//                 <option value="5:00 PM">5:00 PM</option>
//                 <option value="5:30 PM">5:30 PM</option>
//                 <option value="6:00 PM">6:00 PM</option>
//                 <option value="6:30 PM">6:30 PM</option>
//                 <option value="7:00 PM">7:00 PM</option>
//                 <option value="7:30 PM">7:30 PM</option>
//                 <option value="8:00 PM">8:00 PM</option>
//                 <option value="8:30 PM">8:30 PM</option>
//                 <option value="9:00 PM">9:00 PM</option>
//                 <option value="9:30 PM">9:30 PM</option>
//                 <option value="10:00 PM">10:00 PM</option>
//                 <option value="10:30 PM">10:30 PM</option>
//                 <option value="11:00 PM">11:00 PM</option>
//                 <option value="11:30 PM">11:30 PM</option>
//               </select>
//               and
//               <select className="bg-transparent theme-color" name="end">
//                 <option value="12:00 AM">12:00 AM</option>
//                 <option value="12:30 AM">12:30 AM</option>
//                 <option value="1:00 AM">1:00 AM</option>
//                 <option value="1:30 AM">1:30 AM</option>
//                 <option value="2:00 AM">2:00 AM</option>
//                 <option value="2:30 AM">2:30 AM</option>
//                 <option value="3:00 AM">3:00 AM</option>
//                 <option value="3:30 AM">3:30 AM</option>
//                 <option value="4:00 AM">4:00 AM</option>
//                 <option value="4:30 AM">4:30 AM</option>
//                 <option value="5:00 AM">5:00 AM</option>
//                 <option value="5:30 AM">5:30 AM</option>
//                 <option value="6:00 AM">6:00 AM</option>
//                 <option value="6:30 AM">6:30 AM</option>
//                 <option value="7:00 AM">7:00 AM</option>
//                 <option value="7:30 AM">7:30 AM</option>
//                 <option value="8:00 AM">8:00 AM</option>
//                 <option value="8:30 AM">8:30 AM</option>
//                 <option value="9:00 AM">9:00 AM</option>
//                 <option value="9:30 AM">9:30 AM</option>
//                 <option value="10:00 AM">10:00 AM</option>
//                 <option value="10:30 AM">10:30 AM</option>
//                 <option value="11:00 AM">11:00 AM</option>
//                 <option value="11:30 AM">11:30 AM</option>
//                 <option value="12:00 PM">12:00 PM</option>
//                 <option value="12:30 PM">12:30 PM</option>
//                 <option value="1:00 PM">1:00 PM</option>
//                 <option value="1:30 PM">1:30 PM</option>
//                 <option value="2:00 PM">2:00 PM</option>
//                 <option value="2:30 PM">2:30 PM</option>
//                 <option value="3:00 PM">3:00 PM</option>
//                 <option value="3:30 PM">3:30 PM</option>
//                 <option value="4:00 PM">4:00 PM</option>
//                 <option value="4:30 PM">4:30 PM</option>
//                 <option value="5:00 PM">5:00 PM</option>
//                 <option value="5:30 PM">5:30 PM</option>
//                 <option value="6:00 PM">6:00 PM</option>
//                 <option value="6:30 PM">6:30 PM</option>
//                 <option value="7:00 PM">7:00 PM</option>
//                 <option value="7:30 PM">7:30 PM</option>
//                 <option value="8:00 PM">8:00 PM</option>
//                 <option value="8:30 PM">8:30 PM</option>
//                 <option value="9:00 PM">9:00 PM</option>
//                 <option value="9:30 PM">9:30 PM</option>
//                 <option value="10:00 PM">10:00 PM</option>
//                 <option value="10:30 PM">10:30 PM</option>
//                 <option value="11:00 PM">11:00 PM</option>
//                 <option value="11:30 PM">11:30 PM</option>
//               </select>
//             </div>
//             <div className="px-4">
//               <button
//                 className="bg-green-400 hover:bg-green-700 text-white rounded-1 p-2 mx-1"
//                 onClick={() =>
//                   setConditionsBooking(
//                     conditionsBooking.filter((r) => r.resourceId !== rule.resourceId)
//                   )
//                 }
//               >
//                 <Delete sx={{ color: "white" }} />
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           onClick={handleAddRule}
//           className="p-2 border my-2 bg-green-400 hover:bg-green-700 hover:text-white rounded-1"
//         >
//           Add Rule
//         </button>
//       </div>
//     </div>
//   );
// }













import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { Cancel, AddCircleOutline } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

export default function ConditionsBooking() {
  const [conditionsBooking, setConditionsBooking] = useState([]);

  const resourceMap = [
    {
      resourceId: 1,
      resourcePrice: 3000,
      resourceTitle: "Padel Court 1",
      availability: { start: "00:00", end: "20:00" },
    },
    {
      resourceId: 2,
      resourcePrice: 3500,
      resourceTitle: "Padel Court 2",
      availability: { start: "00:00", end: "22:00" },
    },
    {
      resourceId: 3,
      resourcePrice: 3000,
      resourceTitle: "Padel Court 3",
      availability: { start: "00:00", end: "20:00" },
    },
    {
      resourceId: 4,
      resourcePrice: 3000,
      resourceTitle: "Padel Court 4",
      availability: { start: "00:00", end: "20:00" },
    },
    {
      resourceId: 5,
      resourcePrice: 3000,
      resourceTitle: "Padel Court 5",
      availability: { start: "00:00", end: "20:00" },
    },
    {
      resourceId: 6,
      resourcePrice: 3000,
      resourceTitle: "Cricket ( 9-aside )",
      availability: { start: "00:00", end: "20:00" },
    },
    {
      resourceId: 7,
      resourcePrice: 2000,
      resourceTitle: "Cricket ( 7-aside )",
      availability: { start: "00:00", end: "20:00" },
    },
    {
      resourceId: 8,
      resourcePrice: 4000,
      resourceTitle: "Super Sunday ( 7-aside )",
      availability: { start: "11:00", end: "23:00" },
    },
  ];

  const handleAddRule = () => {
    const newRule = {
      resourceId: conditionsBooking.length + 1,
      resources: [],
      from: "00:00",
      to: "23:00",
      duration: "",
      interval: "",
      operator: "",
    };
    setConditionsBooking([...conditionsBooking, newRule]);
  };

  const handleSelectChange = (e, ruleIndex) => {
    const updatedConditions = [...conditionsBooking];
    updatedConditions[ruleIndex].resources = e.target.value;
    setConditionsBooking(updatedConditions);
  };

  const handleTimeChange = (e, ruleIndex, type) => {
    const updatedConditions = [...conditionsBooking];
    updatedConditions[ruleIndex][type] = e.target.value;
    setConditionsBooking(updatedConditions);
  };

  const handleDurationChange = (e, ruleIndex) => {
    const updatedConditions = [...conditionsBooking];
    updatedConditions[ruleIndex].duration = e.target.value;
    setConditionsBooking(updatedConditions);
  };

  const handleIntervalChange = (e, ruleIndex) => {
    const updatedConditions = [...conditionsBooking];
    updatedConditions[ruleIndex].interval = e.target.value;
    setConditionsBooking(updatedConditions);
  };

  const handleOperatorChange = (e, ruleIndex) => {
    const updatedConditions = [...conditionsBooking];
    updatedConditions[ruleIndex].operator = e.target.value;
    setConditionsBooking(updatedConditions);
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: "0px",
      fontSize: 12,
      padding: "0px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  }));

  const timeOptions = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];

  const operatorOptions = [
    "is greater than", "is less than", "is less than or equal to",
    "is greater than or equal to", "is equal to", "is not equal to",
    "is not a multiple of"
  ];

  const durationOptions = [
    "its duration", 
    "the interval from 00:00 to its start", 
    "the interval from its end to 00:00", 
    "the holder's set of tags"
  ];

  const intervalOptions = [
    "30m", "1h", "1h 30m", "2h", "2h 30m", "3h", "3h 30m", "4h", "4h 30m",
    "5h", "5h 30m", "6h", "6h 30m", "7h", "7h 30m", "8h", "8h 30m", "9h",
    "9h 30m", "10h", "10h 30m", "11h", "11h 30m", "12h"
  ];

  return (
    <div>
      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">HOURS OF AVAILABILITY</h3>
        <p className="text-md text-gray-600 my-3">
          These are your venue's broad "opening hours". Times outside of these
          hours will be displayed in a darker shade of gray on your scheduler
          and won't be bookable by users.
        </p>
        {conditionsBooking.map((rule, index) => (
          <div key={index} className="text-md my-3 p-3 bg-gray-200">
            <div className="flex justify-between">
              <div>
                <Select
                  style={{
                    backgroundColor: "transparent",
                    maxHeight: "20px",
                    overflowY: "hidden",
                    border: "none",
                    maxWidth: "500px",
                  }}
                  input={<BootstrapInput />}
                  labelId="select-multiple-checkbox-label"
                  id="select-multiple-checkbox"
                  multiple
                  size="small"
                  value={rule.resources}
                  onChange={(e) => handleSelectChange(e, index)}
                  renderValue={(selected) => (
                    <div
                      className="flex flex-wrap"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                      }}
                    >
                      {resourceMap
                        .filter((item) => selected.includes(item.resourceId))
                        .map((item) => (
                          <div key={item.resourceId} className="mx-1">
                            {item.resourceTitle}
                          </div>
                        ))}
                    </div>
                  )}
                >
                  {resourceMap.map((item) => (
                    <MenuItem key={item.resourceId} value={item.resourceId}>
                      <Checkbox
                        checked={rule.resources.includes(item.resourceId)}
                      />
                      <ListItemText primary={item.resourceTitle} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-row mx-2 text-center items-center">
                <label className="mr-2">From:</label>
                <select
                  value={rule.from}
                  onChange={(e) => handleTimeChange(e, index, "from")}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row mx-2 text-center items-center">
                <label className="mr-2">To:</label>
                <select
                  value={rule.to}
                  onChange={(e) => handleTimeChange(e, index, "to")}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="bg-white text-white rounded-1 p-2 mx-1"
                onClick={() =>
                  setConditionsBooking(
                    conditionsBooking.filter((_, i) => i !== index)
                  )
                }
              >
                <Cancel sx={{ color: "red" }} />
              </button>
            </div>
            <div className="mt-2">
              <select
                className="mr-2 bg-transparent theme-color"
                name="duration"
                value={rule.duration}
                onChange={(e) => handleDurationChange(e, index)}
              >
                {durationOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="mr-2 bg-transparent theme-color"
                name="interval"
                value={rule.interval}
                onChange={(e) => handleIntervalChange(e, index)}
              >
                {intervalOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="bg-transparent theme-color"
                name="operator"
                value={rule.operator}
                onChange={(e) => handleOperatorChange(e, index)}
              >
                {operatorOptions.map((operator) => (
                  <option key={operator} value={operator}>
                    {operator}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddRule}
          className="p-2 border my-2 bg-green-400 hover:bg-green-700 hover:text-white rounded-1 flex items-center"
        >
          <AddCircleOutline className="mr-2" />
          Add Rule
        </button>
      </div>
    </div>
  );
}

