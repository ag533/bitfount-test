const shownReminders = new Set<string>();
export const scheduleNotifications = (reminders: any[]) => {  
    const now = new Date();
    reminders.forEach(reminder => {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const reminderTime = new Date();
      reminderTime.setHours(hours, minutes, 0, 0);
      if (
        now.getDay() === getDayIndex(reminder.day) &&
        now >= reminderTime &&
        now < new Date(reminderTime.getTime() + 60000) &&
        !shownReminders.has(reminder.id)
      ) {
        showNotification(reminder.text);
        shownReminders.add(reminder.id);
      }
    });
};
  
const showNotification = (text: string) => {
  if (Notification.permission === 'granted') {
    new Notification('Reminder', {
      body: text,
      icon: '/logo192.png', // Path to an icon image
    });
  }
};
  
  export const getDayIndex = (day: string): number => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.indexOf(day);
  };