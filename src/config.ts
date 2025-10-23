import dotenv from 'dotenv';

dotenv.config();

const config={
    PORT: process.env.PORT || 3000,
    DATABASE: process.env.MONGO_URI || process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
}
export const { PORT, DATABASE, JWT_SECRET } = config;
