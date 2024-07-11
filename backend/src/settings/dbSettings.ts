import mongoose from 'mongoose';
import config from '@/config';

export const connectDB = async () => {
  await mongoose
    .connect(config.DB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log(err);
    });
};
