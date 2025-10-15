import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import authRouter from "./routes/authRoute.js";

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

const connectDB = async () => {
    try {
        if (!config.DATABASE) {
            throw new Error("DATABASE connection string is undefined in config.");
        }
        await mongoose.connect(config.DATABASE);
        console.log('Connected to MongoDB:', config.DATABASE);
        app.listen(config.PORT, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.log(err);
    }
};

connectDB();