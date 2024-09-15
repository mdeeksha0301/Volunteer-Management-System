import express from 'express';
import cors from 'cors';
import reviewRoutes from './routes/reviewRoutes';
import authRoutes from './routes/authRoutes';
import connectDB from './config/db';
import adminRouter from './routes/adminRoute';
import dotenv from 'dotenv';
import enentRoute from "./routes/enentRoute";
import cookieParser from 'cookie-parser';
import donationRoutes from './routes/donationRoutes'
import morgan from 'morgan';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
dotenv.config(); 

// database connection
connectDB();

// Middleware
app.use(cors({
  origin: 'volunteer-management-system-hhh46n83r.vercel.app', // Replace with your frontend URL
  credentials: true // Enable credentials (cookies, authorization headers)
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api', reviewRoutes);
app.use('/donation', donationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/auth', authRoutes);
app.use('/event', enentRoute);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// video no. 10
