import mongoose from 'mongoose';
import { DB_CONNECTION_URL } from '../utils/constants.js';

const connectDB = async () => {
  try {
    const mongoConnection = await mongoose.connect(DB_CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${mongoConnection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
