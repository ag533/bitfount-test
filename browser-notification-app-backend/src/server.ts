import express, { Request, Response, NextFunction } from 'express';
// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ReminderModel } from './models/reminder';
import { UserModel } from './models/user';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

const mongoUrl = 'mongodb+srv://abhishek:<Password>@cluster0.pf1z9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const secretKey = 'your_secret_key';

app.post('/api/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });
    res.status(201).json(token);
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.get('/api/reminders', authenticate, async (req: Request, res: Response) => {
  console.log(req.user);
  const reminders = await ReminderModel.find({ userId: req.user.userId });
  res.json(reminders);
});

app.post('/api/reminders', authenticate, async (req: Request, res: Response) => {
  const newReminder = new ReminderModel({ ...req.body, userId: req.user.userId });
  await newReminder.save();
  console.log(newReminder);
  res.status(201).json(newReminder);
});

app.delete('/api/reminders/:id', authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  await ReminderModel.findOneAndDelete({ id, userId: req.user.userId });
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});