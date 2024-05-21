import React, { useEffect, useState } from "react";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";

export default function QuotaRules() {
  const [rules, setRules] = useState([]);
  const [quotaRule, setQuotaRule] = useState({
    tag: [],
    ruleType: "",
    type: "",
    bookingCount: {
      count: "",
      session: "",
      resources: [],
    },
    timeUsage: {
      hours: "",
      minutes: "",
      session: "",
      resources: [],
    },
  });
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

  const getRuleData = (e) => {
    const { value, name } = e.target;
    setQuotaRule({ ...quotaRule, [name]: value });
  };

  useEffect(() => {
    console.log(quotaRule);
  }, [quotaRule]);
  return (
    <div>
      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">QUOTA RULES</h3>
        <p className="text-md text-gray-600 my-3">
          These rules prevent non-admin users from creating a booking if it
          exceeds their usage allowance. Learn more
        </p>
        {/* {rules.map((rule) => ( */}
        <div className="text-md  my-3 p-3 bg-gray-200 flex justify-between">
          <div className="">
            <div className="space-y-2 my-1">
              <label className="text-md my-2" for="exampleInputEmail1">
                Limit
              </label>
              <div className="grid lg:grid-cols-4   md:grid-cols-1">
                <select
                  className="p-2 border rounded-0"
                  style={{ maxWidth: "200px" }}
                  name="ruleType"
                  value={quotaRule && quotaRule.ruleType}
                  onChange={getRuleData}
                >
                  <option value="individuals">individuals</option>
                  <option value="with_tags">
                    individuals with any of this tag{" "}
                  </option>
                  <option value="withOut_tags">
                    individuals with none of this tag
                  </option>
                </select>
                {quotaRule.ruleType !== "individuals" && (
                  <Select
                    className="bg-white p-0 rounded-0 w-100 m-0 "
                    style={{
                      maxHeight: "45px",
                      width: "100%",
                      maxWidth: "200px",
                    }}
                    labelId="select-multiple-checkbox-label"
                    id="select-multiple-checkbox"
                    multiple
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
                    <MenuItem
                      key="Monday"
                      value="Monday"
                      className="pt-1 px-3 "
                    >
                      <Checkbox
                        checked={selectedItems.includes("Monday")}
                        // onChange={() =>
                        //   handleCheckboxChange(item)
                        // }
                        className="p-0"
                        size="small"
                      />
                      <span className="border text-gray-600 px-1 text-sm font-semibold">
                        Finance Team{" "}
                      </span>
                    </MenuItem>
                    <MenuItem
                      key="Tuesday"
                      value="Tuesday"
                      className="pt-1 px-3 "
                    >
                      <Checkbox
                        checked={selectedItems.includes("Tuesday")}
                        // onChange={() =>
                        //   handleCheckboxChange(item)
                        // }
                        className="p-0"
                        size="small"
                      />
                      <span className="border text-gray-600 px-1 text-sm font-semibold">
                        Marketing Team{" "}
                      </span>
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
                      <span className="border text-gray-600 px-1 text-sm font-semibold">
                        Software Team{" "}
                      </span>
                    </MenuItem>
                  </Select>
                )}
              </div>
            </div>
            <div className="space-y-2 my-1">
              <label className="text-md my-2" for="exampleInputEmail1">
                to a per-user
              </label>
              <div>
                <select
                  className="p-2 rounded-0"
                  style={{ maxWidth: "165px" }}
                  name="type"
                  // value={newEvent && newEvent.start}
                  onChange={getRuleData}
                >
                  <option value="time_usage">time-usage maximum</option>
                  <option value="booking_count">booking count maximum</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 my-1">
              <label className="text-md my-2" for="exampleInputEmail1">
                of
              </label>
              {quotaRule.type === "time_usage" ? (
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                  <input
                    type="text"
                    class="p-2 border rounded-0"
                    placeholder="e.g Jones"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <select
                    className="p-2 border rounded-0"
                    style={{ maxWidth: "200px" }}
                    name="start"
                    // value={newEvent && newEvent.start}
                    // onChange={getEventData}
                  >
                    <option value="12:00 AM">0m</option>
                    <option value="12:30 AM">30m</option>
                  </select>
                  <select
                    className="p-2 border rounded-0"
                    style={{ maxWidth: "200px" }}
                    name="start"
                    // value={newEvent && newEvent.start}
                    // onChange={getEventData}
                  >
                    <option value="12:00 AM">per day</option>
                    <option value="12:30 AM">
                      pre week ( starting monday )
                    </option>
                    <option value="12:30 AM">pre month </option>
                    <option value="12:30 AM">at any given moment </option>
                  </select>
                  <Select
                    className="bg-white p-0 rounded-0 w-100 m-0"
                    style={{ maxHeight: "45px", width: "100%" }}
                    labelId="select-multiple-checkbox-label"
                    id="select-multiple-checkbox"
                    multiple
                    // size="small"
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
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-0 ">
                  <input
                    type="text"
                    class="form-control p-2 rounded-0"
                    placeholder="e.g 24"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <select
                    className="p-2 rounded-0"
                    style={{ maxWidth: "200px" }}
                    name="start"
                    // value={newEvent && newEvent.start}
                    // onChange={getEventData}
                  >
                    <option value="12:00 AM">per day</option>
                    <option value="12:30 AM">
                      pre week ( starting monday )
                    </option>
                    <option value="12:30 AM">pre month </option>
                    <option value="12:30 AM">at any given moment </option>
                  </select>
                  <Select
                    className="bg-white p-0 rounded-0 w-100 m-0"
                    style={{ maxHeight: "45px", width: "100%" }}
                    labelId="select-multiple-checkbox-label"
                    id="select-multiple-checkbox"
                    multiple
                    // size="small"
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
                </div>
              )}
            </div>
          </div>
          <div className="">
            <button className="bg-white p-2 mx-1">del</button>
            <button className="bg-white p-2 mx-1">save</button>
          </div>
        </div>
        {/* ))} */}
        <button className="bg-green-400 p-2 text-white">
          Add a quota rule
        </button>
      </div>
    </div>
  );
}
