import dotenv from 'dotenv';
import { de } from 'zod/locales';
dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    DATABASE: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
