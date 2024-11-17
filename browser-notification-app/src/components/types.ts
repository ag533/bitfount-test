export interface Reminder {
    id?: string;
    text: string;
    day: string;
    time: string;
  }
  
  export interface ReminderFormProps {
    addReminder: (reminder: Reminder) => void;
    dayError: string | null;
    setDayError: (error: string | null) => void;
  }
  
  export interface ReminderListProps {
    reminders: Reminder[];
    setReminders: (reminders: Reminder[]) => void;
  }