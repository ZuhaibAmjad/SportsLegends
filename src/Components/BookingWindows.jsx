import React, { useEffect, useState } from "react";
import { Checkbox, MenuItem, Select } from "@mui/material";
import { CancelOutlined, AddCircleOutline } from "@mui/icons-material";
import { styled } from '@mui/system';

const CancelIcon = styled(CancelOutlined)(({ theme }) => ({
  color: "red",
  transition: "color 0.3s",
  '&:hover': {
    color: "darkred",
  }
}));

export default function BookingWindow() {
  const [windows, setWindows] = useState([]);
  const [bookingWindow, setBookingWindow] = useState({
    tag: [],
    windowType: "",
    type: "",
    duration: {
      days: [],
      hours: "",
    },
    moreThanLessThan: "",
    hoursInAdvance: ""
  });
  const [selectedItems, setSelectedItems] = useState([]);

  const getWindowData = (e) => {
    const { value, name } = e.target;
    setBookingWindow({ ...bookingWindow, [name]: value });
  };

  const handleCheckboxChange = (item) => {
    setBookingWindow({
      ...bookingWindow,
      duration: {
        ...bookingWindow.duration,
        days: bookingWindow.duration.days.includes(item)
          ? bookingWindow.duration.days.filter((day) => day !== item)
          : [...bookingWindow.duration.days, item],
      },
    });
  };

  useEffect(() => {
    console.log(bookingWindow);
  }, [bookingWindow]);

  return (
    <div>
      <div className="px-3 my-5 ">
        <h3 className="text-xl font-semibold">BOOKING WINDOW RULES</h3>
        <p className="text-md text-gray-600 my-3">
          These rules constrain how far in advance a booking can be made. If no rules match, the booking can be created arbitrarily far in advance. 
          <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-500">Learn more</a>
        </p>
        <div className="text-md my-3 rounded-1 p-3 bg-gray-200 flex justify-between">
          <div className="">
            <div className="space-y-2 my-1">
              <label className="text-md my-2" htmlFor="windowType">
                Window Type
              </label>
              <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-1">
                <Select
                  className="border rounded-1"
                  style={{ maxWidth: "300px" }}
                  name="windowType"
                  value={bookingWindow.windowType}
                  onChange={getWindowData}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Window Type
                  </MenuItem>
                  <MenuItem value="alluser">All Users</MenuItem>
                  <MenuItem value="with_tags">Users with any of this tag</MenuItem>
                  <MenuItem value="withOut_tags">Users with none of this tag</MenuItem>
                </Select>
                {bookingWindow.windowType !== "alluser" && (
                  <Select
                    className="bg-white p-0 rounded-1 w-100 m-0 "
                    style={{
                      maxHeight: "45px",
                      width: "100%",
                      maxWidth: "300px",
                    }}
                    labelId="select-multiple-checkbox-label"
                    id="select-multiple-checkbox"
                    multiple
                    value={selectedItems}
                    onChange={(e) => setSelectedItems(e.target.value)}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Tags</em>;
                      }
                      return (
                        <div className="flex flex-wrap">
                          {selected.map((value) => (
                            <div key={value} className="m-1">
                              {value}
                            </div>
                          ))}
                        </div>
                      );
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Tags
                    </MenuItem>
                    <MenuItem
                      key="Finance Team"
                      value="Finance Team"
                      className="pt-1 px-3 "
                    >
                      <Checkbox
                        checked={selectedItems.includes("Finance Team")}
                        onChange={() => handleCheckboxChange("Finance Team")}
                        className="p-0"
                        size="small"
                      />
                      <span className="border text-gray-600 px-1 text-sm font-semibold">
                        Finance Team
                      </span>
                    </MenuItem>
                    <MenuItem
                      key="Marketing Team"
                      value="Marketing Team"
                      className="pt-1 px-3 "
                    >
                      <Checkbox
                        checked={selectedItems.includes("Marketing Team")}
                        onChange={() => handleCheckboxChange("Marketing Team")}
                        className="p-0"
                        size="small"
                      />
                      <span className="border text-gray-600 px-1 text-sm font-semibold">
                        Marketing Team
                      </span>
                    </MenuItem>
                    <MenuItem
                      key="Software Team"
                      value="Software Team"
                      className="pt-1 px-3 "
                    >
                      <Checkbox
                        checked={selectedItems.includes("Software Team")}
                        onChange={() => handleCheckboxChange("Software Team")}
                        className="p-0"
                        size="small"
                      />
                      <span className="border text-gray-600 px-1 text-sm font-semibold">
                        Software Team
                      </span>
                    </MenuItem>
                  </Select>
                )}
              </div>
            </div>
            <div className="space-y-2 my-1">
              <label className="text-md my-2" htmlFor="duration">
                Cannot make a booking for
              </label>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2">
                <Select
                  className="bg-white p-0 rounded-1 w-100 m-0"
                  style={{ maxHeight: "45px", width: "100%" }}
                  labelId="select-multiple-checkbox-label"
                  id="select-multiple-checkbox"
                  multiple
                  value={bookingWindow.duration.days}
                  onChange={(e) =>
                    setBookingWindow({
                      ...bookingWindow,
                      duration: {
                        ...bookingWindow.duration,
                        days: e.target.value,
                      },
                    })
                  }
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select Days</em>;
                    }
                    return (
                      <div className="flex flex-wrap">
                        {selected.map((value) => (
                          <div key={value} className="m-1">
                            {value}
                          </div>
                        ))}
                      </div>
                    );
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Days
                  </MenuItem>
                  <MenuItem
                    key="test1"
                    value="test1"
                    className="pt-1 px-3 "
                  >
                    <Checkbox
                      checked={bookingWindow.duration.days.includes("test1")}
                      onChange={() => handleCheckboxChange("test1")}
                      className="p-0"
                      size="small"
                    />
                    <span className="border text-gray-600 px-1 text-sm font-semibold">
                      Test 1
                    </span>
                  </MenuItem>
                  <MenuItem
                    key="test2"
                    value="test2"
                    className="pt-1 px-3 "
                  >
                    <Checkbox
                      checked={bookingWindow.duration.days.includes("test2")}
                      onChange={() => handleCheckboxChange("test2")}
                      className="p-0"
                      size="small"
                    />
                    <span className="border text-gray-600 px-1 text-sm font-semibold">
                      Test 2
                    </span>
                  </MenuItem>
                  <MenuItem
                    key="test3"
                    value="test3"
                    className="pt-1 px-3 "
                  >
                    <Checkbox
                      checked={bookingWindow.duration.days.includes("test3")}
                      onChange={() => handleCheckboxChange("test3")}
                      className="p-0"
                      size="small"
                    />
                    <span className="border text-gray-600 px-1 text-sm font-semibold">
                      Test 3
                    </span>
                  </MenuItem>
                  {/* Add more MenuItem components as needed */}
                </Select>
                <input
                  type="number"
                  className="p-2 border rounded-1"
                  placeholder="Hours"
                  name="hours"
                  value={bookingWindow.duration.hours}
                  onChange={(e) =>
                    setBookingWindow({
                      ...bookingWindow,
                      duration: {
                        ...bookingWindow.duration,
                        hours: e.target.value,
                      },
                    })
                  }
                />
                <Select
                  className="bg-white p-0 rounded-1 w-100 m-0"
                  style={{ maxHeight: "45px", width: "100%" }}
                  labelId="more-less-than-label"
                  id="more-less-than"
                  value={bookingWindow.moreThanLessThan}
                  onChange={(e) => setBookingWindow({ ...bookingWindow, moreThanLessThan: e.target.value })}
                  displayEmpty
                >
                   <MenuItem value="" >
                    More than
                  </MenuItem> 
                  {/* <MenuItem value="more">More than</MenuItem> */}
                  <MenuItem value="less">Less than</MenuItem>
                </Select>
                <input
                  type="number"
                  className="p-2 border rounded-1"
                  placeholder="1"
                  name="hoursInAdvance"
                  value={bookingWindow.hoursInAdvance}
                  onChange={(e) => setBookingWindow({ ...bookingWindow, hoursInAdvance: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div>
            <button className="bg-white hover:bg-green-300 text-white rounded-1 p-2 mx-1">
              <CancelIcon />
            </button>
          </div>
        </div>
        <button className="bg-green-400 hover:bg-green-700 p-2 text-white rounded-1">
        <AddCircleOutline className="mr-2" />
          Add a booking window
        </button>
      </div>
    </div>
  );
}
