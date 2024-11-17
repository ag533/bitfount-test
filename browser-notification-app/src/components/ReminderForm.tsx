import React, { useState } from "react";
import { ReminderFormProps, Reminder } from "./types";
import "./ReminderForm.css";

const ReminderForm: React.FC<ReminderFormProps> = ({ addReminder, dayError, setDayError }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const validDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDay(value);
    if (!validDays.includes(value)) {
      setDayError("Please enter a valid day name (e.g., Monday)");
    } else {
      setDayError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dayError) {
      return;
    }
    const newReminder: Reminder = { text, day, time };
    addReminder(newReminder);
    setText("");
    setDay("");
    setTime("");
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Reminder"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Day (e.g., Monday)"
        value={day}
        onChange={handleDayChange}
        required
      />
      <input
        type="time"
        placeholder="8:00 AM"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Add Reminder</button>
    </form>
  );
};

export default ReminderForm;
