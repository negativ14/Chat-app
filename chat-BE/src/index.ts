import express from 'express';
import authRouter from './routes/auth.route';
import dotenv from 'dotenv';
import { connectDB } from './lib/db';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
    connectDB();
})