import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { Cancel, AddCircleOutline } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  ListItemText,
} from "@mui/material";

export default function ConditionsBooking() {
  const [conditionsBooking, setConditionsBooking] = useState([]);

  const resourceMap = [
    {
      resourceId: 8,
      resourcePrice: 4000,
      resourceTitle: "More Down",
    },
  ];

  const handleAddRule = () => {
    const newRule = {
      resourceId: conditionsBooking.length + 1,
      resources: [],
      from: "all spaces",
      to: "all time",
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
    { timeOptionsId: "test1", timeOptionsTitle: "Test 1" },
    { timeOptionsId: "test2", timeOptionsTitle: "Test 2" },
    { timeOptionsId: "test3", timeOptionsTitle: "Test 3" },
    { timeOptionsId: "test4", timeOptionsTitle: "Test 4" },
    { timeOptionsId: "test5", timeOptionsTitle: "Test 5" },
    { timeOptionsId: "test6", timeOptionsTitle: "Test 6" },
    { timeOptionsId: "test7", timeOptionsTitle: "Test 7" },
    { timeOptionsId: "test8", timeOptionsTitle: "Test 8" },
  ];

  const operatorOptions = [
    "is greater than",
    "is less than",
    "is less than or equal to",
    "is greater than or equal to",
    "is equal to",
    "is not equal to",
    "is not a multiple of",
  ];

  const durationOptions = [
    "its duration",
    "the interval from 00:00 to its start",
    "the interval from its end to 00:00",
    "the holder's set of tags",
  ];

  const intervalOptions = [
    "30m",
    "1h",
    "1h 30m",
    "2h",
    "2h 30m",
    "3h",
    "3h 30m",
    "4h",
    "4h 30m",
    "5h",
    "5h 30m",
    "6h",
    "6h 30m",
    "7h",
    "7h 30m",
    "8h",
    "8h 30m",
    "9h",
    "9h 30m",
    "10h",
    "10h 30m",
    "11h",
    "11h 30m",
    "12h",
  ];

  return (
    <div>
      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">BOOKING CONDITIONS</h3>
        <p className="text-md text-gray-600 my-3">
          Use booking conditions to further limit how non-admin users make
          individual bookings. Enforce duration constraints, specify strict
          booking blocks, or completely deny bookings at certain times.{" "}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Learn more
          </a>
        </p>
        {conditionsBooking.map((rule, index) => (
          <div key={index} className="text-md my-3 p-3 bg-gray-200">
            <div className="flex justify-between">
              <div>
                <Select
                  style={{
                    backgroundColor: "white",
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
                <
select
                  value={rule.from}
                  onChange={(e) => handleTimeChange(e, index, "from")}
                >
                  {timeOptions.map((time) => (
                    <option key={time.timeOptionsId} value={time.timeOptionsId}>
                      {time.timeOptionsTitle}
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
                    <option key={time.timeOptionsId} value={time.timeOptionsId}>
                      {time.timeOptionsTitle}
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
                className="mr-2 bg-white text-black"
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
                className="mr-2 bg-white text-black"
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
                className="bg-white text-black"
                name="operator"
                value={rule.operator}
                onChange={(e) => handleOperatorChange(e, index)}
              >
                {operatorOptions.map((operator, idx) => (
                  <option key={idx} value={operator}>
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
