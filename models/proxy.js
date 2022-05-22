import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const proxySchema = new mongoose.Schema(
  {
    proxy_name: {
      type: String,
      required: [true, 'Proxy Name is required'],
      min: [3, 'Proxy Name at least minimum 3 character long'],
      trim: true,
    },
    ip: {
      type: String,
      required: [true, 'IP is required'],
      trim: true,
    },
    port: {
      type: String,
      required: [true, 'Port is required'],
      unique: [true, 'Port should be unique'],
      trim: true,
    },
    bandwidth: {
      type: String,
      required: [true, 'Bandwidth is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      trim: true,
    },
    file_url : {
      type: String,
      required: [true, 'file_url is required'],
      trim: true,
    },
    status: {
      type: Number,
      trim: true,
      default:0, // 1 = Start, 2 = Stop, 3 = Restart
    },
    user_id: {
      type: String,
      required: [true, 'user_id is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

const Proxy = mongoose.model('Proxy', proxySchema);

export default Proxy;
