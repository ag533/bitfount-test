import React, { useState, useEffect } from 'react';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterFrom';
import { Reminder } from './components/types';
import { scheduleNotifications } from './components/utils';

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);
  const [dayError, setDayError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/reminders', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => setReminders(data));
    }
  }, [token]);

  useEffect(() => {
    const now = new Date();
    const millisecondsUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Schedule the first call at the start of the next minute
    const timeout = setTimeout(() => {
      scheduleNotifications(reminders);

      // Set up interval to call scheduleNotifications every minute
      const interval = setInterval(() => {
        scheduleNotifications(reminders);
      }, 60000);

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, millisecondsUntilNextMinute);

    // Clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeout);
  }, [reminders]);

  useEffect(() => {
    console.log(Notification.permission);
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const addReminder = (newReminder: Reminder) => {
    fetch('http://localhost:5000/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newReminder),
    })
      .then(response => response.json())
      .then(data => setReminders(prevReminders => [...prevReminders, data]));
  };

  if (!token) {
    return isRegistering ? (
      <RegisterForm onRegister={handleLogin} onToggleLogin={() => setIsRegistering(false)} />
    ) : (
      <LoginForm onLogin={handleLogin} onToggleRegister={() => setIsRegistering(true)} />
    );
  }

  return (
    <div className="App">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="header-container">
        <h1 className="header-title">Set Reminder</h1>
      </div>
      <ReminderForm addReminder={addReminder} dayError={dayError} setDayError={setDayError} />
      {dayError && <p className="error">{dayError}</p>}
      <h2>Reminders List</h2>
      <ReminderList reminders={reminders} setReminders={setReminders} />
    </div>
  );
};

export default App;