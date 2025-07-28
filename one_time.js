import mongoose from 'mongoose';
import User from './models/userModel.js'; // your model
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(async () => {
//   await User.deleteMany(); // optional, clears old users

  const newUser = new User({ username: 'aymane', password: '0000' });
  await newUser.save();

  console.log('User created');
  process.exit();
});
