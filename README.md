# 🔐 MERN Authentication Assignment

This is a full-stack authentication system built using the MERN stack. It includes secure sign-up and login functionality, using **JWT tokens** for authentication and **bcrypt** for password hashing. The frontend is styled using **TailwindCSS** and powered by **React**, while the backend runs on **Node.js** and **Express** with **MongoDB** as the database.

---

## 🚀 Features

- Secure Sign-up and Login pages
- JWT-based authentication with HttpOnly cookies
- Passwords hashed using bcrypt
- Token validation on protected routes
- React frontend with a beautiful UI
- Error handling and toast notifications

---

## 📦 Installation

Install and run this full-stack application using the steps below:

```bash
# Clone the repository
git clone https://github.com/Subhadro/yantrix_assignment.git
cd yantrix_assignment

# Set up the frontend
cd frontend
npm install
npm run dev
# ➤ Frontend will be available at http://localhost:5173

# Open a new terminal and set up the backend
cd ../backend
npm install
npm run dev
# ➤ Backend will run at http://localhost:3000
