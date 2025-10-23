# 🧠 Brainly Backend

A simple and clean backend API for the Brainly application built with Node.js, Express, and MongoDB.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **TypeScript** - Type safety
- **JWT** - Authentication

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brainly-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server

## 📡 API Endpoints

The server will be running at `http://localhost:3000`

## 📝 Notes

- Make sure to replace the MongoDB connection string in your `.env` file
- Keep your JWT secret secure and don't commit it to version control

