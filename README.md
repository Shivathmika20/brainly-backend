# 🧠 Brainly Backend

This is the **backend server** for the Brainly MERN stack application.  
It provides RESTful APIs for authentication, content management, and database interactions using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **MongoDB Atlas** – Cloud database
- **Mongoose** – ODM for MongoDB
- **JWT (JSON Web Token)** – Authentication

 

## ⚙️ Environment Variables

Create a `.env` file in the project root and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/brainly
JWT_SECRET=yourSecret
```



## 🚀 Run Locally
1️⃣ Clone the repository
```
git clone https://github.com/<your-username>/brainly-backend.git
cd brainly-backend
```

2️⃣ Install dependencies
```
npm install 
```
3️⃣ Start the development server
```
npm run dev
```




The server should now be running at:
👉 http://localhost:5000

