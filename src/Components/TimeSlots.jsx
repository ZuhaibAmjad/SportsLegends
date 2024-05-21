import React from "react";

const TimeSelect = ({ id, selectedTime, onChange ,event }) => {
  if (!event || !event.start || !event.end) {
    return null; // Return null or handle the case where event is not defined or missing properties
  }
  const eventStartTime = new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const eventEndTime = new Date(event.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <select id={id} className="form-control rounded-0" value={`${eventStartTime}-${eventEndTime}`} onChange={onChange}>
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
  );
};

export default TimeSelect;
