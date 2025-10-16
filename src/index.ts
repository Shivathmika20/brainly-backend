import express from "express";
import mongoose from "mongoose";
import {DATABASE,PORT} from "./config.js";
import authRouter from "./routes/authRoute";
import contentRouter from "./routes/contentRoute";
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', contentRouter);

const connectDB = async () => {
    try {
        if (!DATABASE) {
            throw new Error("DATABASE connection string is undefined in config.");
        }
        await mongoose.connect(DATABASE);
        console.log('Connected to MongoDB:', DATABASE);
        app.listen(PORT, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.log(err);
    }
};

connectDB();