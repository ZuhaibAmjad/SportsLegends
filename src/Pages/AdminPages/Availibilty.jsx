import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

export default function Availibilty() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedResource, setSelectedResource] = useState([]);

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
      typeavailability: { start: "00:00", end: "20:00" },
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
      start: new Date().setHours(11, 0, 0), // 12pm
      end: new Date().setHours(23, 0, 0),
    },
  ];
  const [rules, setRules] = useState(resourceMap);

  const handleAddRule = () => {
    const newRule = {
      resourceId: 9,
      resourcePrice: 4000,
      resourceTitle: "Super Sunday ( 7-aside )",
      start: new Date().setHours(11, 0, 0),
      end: new Date().setHours(23, 0, 0),
    };
    setRules([...rules, newRule]);
  };

  const handleCheckboxChange = (item) => {
    const selectedIndex = selectedResource.indexOf(item.resourceId);
    let newSelectedResource = [...selectedResource];

    if (selectedIndex === -1) {
      // Checkbox is checked
      newSelectedResource.push(item.resourceId);
    } else {
      // Checkbox is unchecked
      newSelectedResource.splice(selectedIndex, 1);
    }

    setSelectedResource(newSelectedResource);
    // setRules((prevEvent) => ({
    //   ...prevEvent,
    //   resources: newSelectedItems,
    // }));
  };

  const [newRule, setNewRule] = useState({
    no: "",
    resources: [],
    from: [],
    to: [],
    days: [],
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: "0px",
      // position: 'relative',
      // backgroundColor: theme.palette.background.paper,
      // border: '1px solid #ced4da',
      fontSize: 12,
      padding: '0px',
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
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
  return (
    <div>
      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">HOURS OF AVAILABILITY</h3>
        <p className="text-md text-gray-600 my-3">
          These are your venue's broad "opening hours". Times outside of these
          hours will be displayed in a darker shade of gray on your scheduler
          and won't be bookable by users.
        </p>
        {rules.map((rule) => (
          <div className="text-md  my-3 p-3 bg-gray-200 flex justify-between">
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
                value={selectedResource}
                onChange={(e) => setSelectedItems(e.target.value)}
                renderValue={(selected) => (
                  <div
                    className="flex flex-wrap"
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "200px", // Adjust the max width as needed
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
                  <MenuItem
                    key={item.resourceId}
                    value={item.resourceId}
                    className="p-0"
                  >
                    <Checkbox
                      checked={selectedResource.includes(item.resourceId)}
                      onChange={() => handleCheckboxChange(item)}
                      className=""
                      size="small"
                    />
                    {item.resourceTitle}
                  </MenuItem>
                ))}
              </Select>
              is available between
              <select
                className="bg-transparent theme-color"
                name="start"
                // value={newEvent && newEvent.start}
                // onChange={getEventData}
              >
                <option value="12:00 AM">12:00 AM</option>
                <option value="12:30 AM">12:30 AM</option>
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
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
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
                <option value="10:00 PM">10:00 PM</option>
                <option value="10:30 PM">10:30 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="11:30 PM">11:30 PM</option>
              </select>
              to
              <select
                className="bg-transparent theme-color"
                // value={newEvent && newEvent.end}
                // onChange={getEventData}
                name="end"
              >
                {/* <option value={newEvent && newEvent.end}>
                    {newEvent && newEvent.end}
                  </option> */}
                <option value="12:00 AM">12:00 AM</option>
                <option value="12:30 AM">12:30 AM</option>
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
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
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
                <option value="10:00 PM">10:00 PM</option>
                <option value="10:30 PM">10:30 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="11:30 PM">11:30 PM</option>
              </select>
              on
              <Select
                className="border-none"
                labelId="select-multiple-checkbox-label"
                id="select-multiple-checkbox"
                multiple
                size="small"
                value={selectedItems}
                // onChange={(e) =>
                //   setSelectedItems(e.target.value)
                // }
                renderValue={(selected) => (
                  <div className="flex flex-wrap">
                    {resourceMap
                      .filter((item) => selected.includes(item.resourceId))
                      .map((item) => (
                        <div key={item.resourceId} className="m-1">
                          {item.resourceTitle}
                        </div>
                      ))}
                  </div>
                )}
              >
                <MenuItem key="Monday" value="Monday" className="pt-1 px-3 ">
                  <Checkbox
                    checked={selectedItems.includes("Monday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Monday
                </MenuItem>
                <MenuItem key="Tuesday" value="Tuesday" className="pt-1 px-3 ">
                  <Checkbox
                    checked={selectedItems.includes("Tuesday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Tuesday
                </MenuItem>
                <MenuItem
                  key="Wednesday"
                  value="Wednesday"
                  className="pt-1 px-3 "
                >
                  <Checkbox
                    checked={selectedItems.includes("Wednesday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Wednesday
                </MenuItem>
                <MenuItem
                  key="Thursday"
                  value="Thursday"
                  className="pt-1 px-3 "
                >
                  <Checkbox
                    checked={selectedItems.includes("Thursday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Thursday
                </MenuItem>
                <MenuItem key="Friday" value="Friday" className="pt-1 px-3 ">
                  <Checkbox
                    checked={selectedItems.includes("Friday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Friday
                </MenuItem>
                <MenuItem
                  key="Saturday"
                  value="Saturday"
                  className="pt-1 px-3 "
                >
                  <Checkbox
                    checked={selectedItems.includes("Saturday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Saturday
                </MenuItem>
                <MenuItem key="Sunday" value="Sunday" className="pt-1 px-3 ">
                  <Checkbox
                    checked={selectedItems.includes("Sunday")}
                    // onChange={() =>
                    //   handleCheckboxChange(item)
                    // }
                    className="p-0"
                    size="small"
                  />
                  Sunday
                </MenuItem>
              </Select>
            </div>
            <div className="">
              <button className="bg-white p-2 mx-1">del</button>
              <button className="bg-white p-2 mx-1">save</button>
            </div>
          </div>
        ))}
        <button className="bg-green-400 p-2 text-white" onClick={handleAddRule}>
          Add more hours
        </button>

        <h3 className="text-xl font-semibold mt-5">SCHEDULER DISPLAY HOURS</h3>
        <div className="text-md  my-3 p-3 bg-gray-200">
          Show the hours to on the scheduler time axis.
        </div>

        <h3 className="text-xl font-semibold mt-5">
          PUBLIC HOLIDAYS AND SEASONAL VARIATION
        </h3>
        <p className="text-md text-gray-600 my-3">
          Use (recurring) unavailable bookings on your scheduler to flexibly
          handle any exceptions to the above times. Learn more
        </p>
      </div>
    </div>
  );
}
