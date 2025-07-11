# 💬 ChatApp – MERN Stack

A secure and scalable **real-time chat application** built using the **MERN stack**:

- 🔐 User Signup & Login with JWT + HttpOnly cookies  
- 🛡️ Protected Admin/User Dashboard  
- 🧱 Modular MVC structure  
- 💬 Real-time messaging using **WebSocket / Stream Chat**   
- 🎨 Modern UI using **TailwindCSS** + **daisyUI**  
- 👥 Private Chat & Call Support  
- 🧑‍🎨 User Profile + Avatars  
- ⌨️ Typing Indicators & Message Status  

---

## 🏗️ Tech Stack

| Layer      | Tech                                 |
|------------|--------------------------------------|
| Frontend   | React, Axios, TailwindCSS, daisyUI   |
| Backend    | Node.js, Express.js                  |
| Auth       | JWT + Cookies (`HttpOnly`)           |
| Database   | MongoDB + Mongoose                   |
| Messaging  | (Planned) WebSocket / Stream Chat    |

---

## 🗂️ Folder Structure

```
chat-app/
│
├── backend/
│   ├── src/
│   │   ├── config/        # MongoDB connection & env config
│   │   ├── controllers/   # Auth & Chat logic
│   │   ├── middleware/    # JWT verification, error handling
│   │   ├── models/        # Mongoose schemas (User, Message)
│   │   └── routes/        # Express routers (auth, chat)
│   └── server.js          # Entry point
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/    # ChatBox, Message, InputField, etc.
│       ├── pages/         # Login, Signup, Dashboard
│       └── App.js         # Routing & layout
```

---

## ⚙️ Getting Started

### 📥 Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 🖥 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in `/backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chat_app
JWT_SECRET=yourSuperSecretKey
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Route                | Description              |
|--------|----------------------|--------------------------|
| POST   | /api/user/signup     | Register new user        |
| POST   | /api/user/login      | User login (cookie auth) |
| GET    | /api/user/dashboard  | Protected route          |
| GET    | /api/chat            | Fetch messages  |
| POST   | /api/chat            | Send message    |

---

## 🔒 Auth Flow

- ✅ JWT Token is stored in a **secure HttpOnly cookie**
- ✅ React frontend uses `axios` with credentials:
- ✅ Backend uses `cookie-parser` + middleware to verify token from cookie

---

## 🙋‍♂️ Author

Built with ❤️ by **Shubhachand**

> _“Write clean. Build fast. Ship securely.”_
