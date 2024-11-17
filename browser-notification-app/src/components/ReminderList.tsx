import React from "react";
import { ReminderListProps } from "./types";
import "./ReminderList.css";

const ReminderList: React.FC<ReminderListProps> = ({ reminders, setReminders }) => {

  const deleteReminder = (id: string) => {
    fetch(`http://localhost:5000/api/reminders/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setReminders(reminders.filter((reminder) => reminder.id !== id));
      })
      .catch((error) => console.error("Error deleting reminder:", error));
  };

  return (
    <ul className="reminder-list">
      {reminders.map((reminder) => (
        <li key={reminder.id}>
          <span>every {reminder.day} at {reminder.time} - {reminder.text}</span>
          <button onClick={() => reminder.id && deleteReminder(reminder.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;