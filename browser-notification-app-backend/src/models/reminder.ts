import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const reminderSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  text: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  userId: { type: String, required: true },
});

export const ReminderModel = mongoose.model('Reminder', reminderSchema);