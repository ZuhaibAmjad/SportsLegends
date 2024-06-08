
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCircleXmark, faUser, faHouseUser, faBan } from '@fortawesome/free-solid-svg-icons';
import { DnDCalendar, localizer } from 'some-calendar-library'; // Replace with your actual calendar import
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';

const YourComponent = ({ open, closeDailog, cancelButtonRef, PageChange, currentPage, newEvent, getEventData, MakeBooking, resource, selectedItems, setSelectedItems, handleCheckboxChange, myEvents, onEventDrop, onEventResize, Booked, handleSelect, CustomEventWrapper, CustomMonthEvent, CustomToolbar, CustomPopup, CustomView, showHeader, scrollToTime }) => {
  const [repeatOption, setRepeatOption] = useState('');

  const handleRepeatChange = (e) => {
    setRepeatOption(e.target.value);
    getEventData(e);
  };

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
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeDailog}>
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
                <Dialog.Panel className="relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 max-w-5xl">
                  <div className="">
                    <div className="bg-white w-full">
                      <div className="w-full ">
                        <div className="">
                          <div className="border">
                            <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-3">
                              <div className="flex items-center">
                                <FontAwesomeIcon className="h-5 mr-2 bg-blue-500 p-2 text-white rounded-5" icon={faCalendarPlus} />
                                <h1 className="fs-4 text-semibold">NEW BOOKING</h1>
                              </div>
                              <button onClick={closeDailog} className="rounded-full p-2 text-sm hover:bg-blue-700 flex items-center bg-blue-500 text-white" ref={cancelButtonRef}>
                                <FontAwesomeIcon icon={faCircleXmark} className="h-6" />
                              </button>
                            </div>

                            <div className="grid lg:grid-cols-1 md:grid-cols-1 mt-2 px-5 py-3">
                              <div className="lg:grid-cols-3 md:grid-cols-3 sm:grid-col-1 my-3 space-x-3">
                                <button className={`border px-3 py-2 rounded-1 ${currentPage === 'user' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => PageChange('user')}>
                                  <FontAwesomeIcon icon={faUser} />
                                  <span className="ml-2">User Booking</span>
                                </button>
                                <button className={`border px-3 py-2 rounded-1 ${currentPage === 'internal' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => PageChange('internal')}>
                                  <FontAwesomeIcon icon={faHouseUser} />
                                  <span className="ml-2">Internal Use</span>
                                </button>
                                <button className={`border px-3 py-2 rounded-1 ${currentPage === 'unavailable' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => PageChange('unavailable')}>
                                  <FontAwesomeIcon icon={faBan} />
                                  <span className="ml-2">Unavailable</span>
                                </button>
                              </div>

                              <div className="my-2 mt-4">
                                <label className="text-sm" htmlFor="exampleInputEmail1">
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
                                        className="form-control rounded-0"
                                        placeholder="e.g Sally"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                                    <div>
                                      <select className="form-control rounded-0" name="start" value={newEvent && newEvent.start} onChange={getEventData}>
                                        <option value={newEvent && newEvent.start}>
                                          From
                                          <span> {newEvent && newEvent.start}</span>
                                        </option>
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
                                    </div>
                                    <div>
                                      <select className="form-control rounded-0" name="end" value={newEvent && newEvent.end} onChange={getEventData}>
                                        <option value={newEvent && newEvent.end}>
                                          To
                                          <span> {newEvent && newEvent.end}</span>
                                        </option>
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
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid lg:grid-cols-1 md:grid-cols-1 my-3">
                                <div className="my-2">
                                  <FormControl fullWidth>
                                    <label htmlFor="repeat" className="text-sm">
                                      REPEAT
                                    </label>
                                    <Select
                                      labelId="repeat"
                                      id="repeat"
                                      value={repeatOption}
                                      onChange={handleRepeatChange}
                                      className="form-control rounded-0"
                                      displayEmpty
                                      inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value="Daily">Daily</MenuItem>
                                      <MenuItem value="Weekly">Weekly</MenuItem>
                                      <MenuItem value="Yearly">Yearly</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                {repeatOption && (
                                  <div className="my-2">
                                    {/* Conditionally render additional fields */}
                                    <label htmlFor="endRepeat" className="text-sm">
                                      End Repeat
                                    </label>
                                    <input
                                      type="date"
                                      id="endRepeat"
                                      name="endRepeat"
                                      value={newEvent.endRepeat}
                                      onChange={getEventData}
                                      className="form-control rounded-0"
                                      required
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="my-2">
                                <Checkbox
                                  checked={selectedItems.includes(resource.id)}
                                  onChange={(e) => handleCheckboxChange(e, resource.id)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label className="text-sm ml-2">{resource.name}</label>
                              </div>

                              <button
                                onClick={MakeBooking}
                                className="border px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
                              >
                                Make Booking
                              </button>
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
    </Fragment>
  );
};

export default YourComponent;
