# 🔐 MERN Authentication System  
## Login, Registration & Password Reset using JWT + Email OTP Verification

A complete authentication system built with the **MERN Stack** featuring secure JWT-based authentication, email verification using OTP, password reset flow, and protected routes.  
This project demonstrates **real-world authentication architecture** used in production applications.

---

## 🚀 Live Demo

- 🌐 **Frontend (Vercel)**  
  👉 https://authentication-system-kohl.vercel.app

- ⚙️ **Backend API (Render)**  
  👉 https://authenticationsystem-illr.onrender.com

---

## 📸 Screenshots

> 📌 Add images inside a `screenshots/` folder

- 🏠 **Home Page**  
  <img width="1366" height="768" alt="Screenshot (91)" src="https://github.com/user-attachments/assets/0c59f509-a357-4794-a70a-3ce02b8923da" />


- 🔑 **Login Page**  
   <img width="1366" height="768" alt="Screenshot (93)" src="https://github.com/user-attachments/assets/222dcf54-5459-43ab-b5b1-ef78884fbd22" />



- 📝 **Register Page**  
  <img width="1366" height="768" alt="Screenshot (92)" src="https://github.com/user-attachments/assets/56d9c10c-7684-47da-b891-e8ce5bb27267" />


- 🔁 **Password Reset**  
  <img width="1366" height="768" alt="Screenshot (94)" src="https://github.com/user-attachments/assets/8982d9ca-d803-4b56-a34a-42dafbf6f861" />


---

## ✨ Features

- ✅ User Registration with Email & Password  
- ✅ Secure Login using JWT Authentication  
- ✅ Email Verification via OTP (NodeMailer + Brevo SMTP)  
- ✅ Forgot Password & Reset Password using OTP  
- ✅ HTTP-Only Cookies for JWT (XSS Protection)  
- ✅ Protected Routes (Backend Middleware)  
- ✅ Context API for Global Auth State  
- ✅ Fully Responsive UI (Tailwind CSS)  
- ✅ Production-ready deployment (Render + Vercel)

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🌐 Axios
- 🧠 Context API
- 🎨 Tailwind CSS
- 🔔 React Toastify

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication
- 🔑 bcrypt.js (Password Hashing)
- ✉️ NodeMailer (Email OTP)
- 🍪 Cookie Parser
- 🌍 CORS Configuration

---

## 🌍 Deployment

- **Frontend** → Vercel  
- **Backend** → Render  
- **Database** → MongoDB Atlas  

---

## 🔐 Authentication Flow

### 📝 Registration
1. User signs up with name, email, password  
2. Password hashed using bcrypt  
3. JWT generated and stored in HTTP-only cookie  
4. Verification OTP sent via email  

### 📩 Email Verification
1. OTP sent to registered email  
2. OTP validated with expiry check  
3. Account marked as verified  

### 🔑 Login
1. Credentials validated  
2. JWT generated and stored securely  
3. User session maintained via cookies  

### 🔁 Password Reset
1. User requests reset via email  
2. OTP sent to email  
3. OTP verified  
4. Password updated securely  

---

## 📂 Project Structure

```text
AuthenticationSystem/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── components/
│   │   └── assets/
│   └── main.jsx
│
└── README.md

````
## ⚙️ Environment Variables
### Backend (Render)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=production

SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_email

```
### Frontend (Vercel)
```
VITE_BACKEND_URL=https://authenticationsystem-illr.onrender.com
```

## 🧪 Run Locally
### Clone the repository
``
git clone https://github.com/amit77t/AuthenticationSystem.git
cd AuthenticationSystem
``
### Backend Setup
```

cd backend
npm install
npm run server
```

### Frontend Setup
```
cd frontend
npm install
npm run dev
```
## 🔒 Security Highlights

- 🔐 Password hashing with bcrypt

- 🍪 HTTP-only JWT cookies

- 🌍 Strict CORS configuration

- ⏱ OTP expiration handling

- 🚫 Sensitive data stored in environment variables


## 📌 Future Improvements
- 🔄 Refresh Token implementation

- 📱 Google / GitHub OAuth

- 🧑‍💼 User Dashboard

- 🧪 Unit & Integration Testing

- 🔐 Role-based Authorization

## 👨‍💻 Author
**Amit Chaurasia**

- GitHub: https://github.com/amit77t

- LinkedIn: https://www.linkedin.com/in/amit-chaurasia-0b9976290

### ⭐ Support
- If you like this project:

- ⭐ Star the repository

- 🍴 Fork it

- 📢 Share it



