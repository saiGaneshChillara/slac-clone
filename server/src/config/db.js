import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB:", connection.connection.host);
  } catch (error) {
    console.log("Errror in connecting to MongoDb", error);
    process.exit(1);
  }
}