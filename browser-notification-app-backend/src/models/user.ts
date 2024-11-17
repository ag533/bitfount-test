import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', userSchema);