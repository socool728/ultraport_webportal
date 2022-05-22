import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';
import userRoutes from './routes/user.js';
import proxyRoutes from './routes/proxy.js';
import cors from 'cors';

dotenv.config();

// Initialize DB Config
connectDB();


const app = express();

// Allow accessing json body data from request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('proxy'))
// Endpoints
app.use('/api/users', userRoutes);
app.use('/api/proxy', proxyRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
