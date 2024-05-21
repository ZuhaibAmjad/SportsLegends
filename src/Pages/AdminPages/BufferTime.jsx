import React, { useState } from "react";
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

  const [newRule, setNewRule] = useState({
    no: "",
    resources: [],
    from: [],
    to: [],
    days: [],
  });
  return (
    <div>
      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">BUFFER TIME RULES</h3>
        <p className="text-md text-gray-600 my-3">
          Buffer rules enable you to enforce any necessary time gaps between
          bookings (e.g. to enable tear-down, cleaning and setup for subsequent
          use). Non-admins are prevented from creating bookings that don't
          respect these rules.
        </p>
        {rules.map((rule) => (
          <div className="text-md  my-3 p-3 bg-gray-200 flex justify-between">
            <div>
              For
              <Select
                style={{
                  backgroundColor: "transparent",
                  maxHeight: "45px",
                  // width: "100%",
                  border: "none",
                  maxWidth: "200px",
                }}
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
                {resourceMap.map((item) => (
                  <MenuItem
                    key={item.resourceId}
                    value={item.resourceId}
                    className="p-0 "
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.resourceId)}
                      // onChange={() =>
                      //   handleCheckboxChange(item)
                      // }
                      className=""
                      size="small"
                    />
                    {item.resourceTitle}
                  </MenuItem>
                ))}
              </Select>
              enforce a buffer time of
              <select
                className="bg-transparent theme-color"
                name="start"
                // value={newEvent && newEvent.start}
                // onChange={getEventData}
              >
                {Array.from({ length: 48 }, (_, index) => {
                  const hours = Math.floor(index / 2);
                  const minutes = index % 2 === 0 ? "00" : "30";
                  const label =
                    minutes === "30" ? `${hours}h ${minutes}min` : `${hours}h`;
                  const value = `${hours}:${minutes}`;
                  return (
                    <option className="m-3" key={index} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
              betweeen bookings
            </div>
            <div className="">
              <button className="bg-white p-2 mx-1">del</button>
              <button className="bg-white p-2 mx-1">save</button>
            </div>
          </div>
        ))}
        <button className="bg-green-400 p-2 text-white" onClick={handleAddRule}>
          Add a Buffer Rule
        </button>
      </div>
    </div>
  );
}
