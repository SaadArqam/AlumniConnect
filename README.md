# Reunify  
*A modern full-stack networking platform bridging students and alumni.*

Reunify enables **students and alumni of the same institution** to connect, share opportunities, mentor each other, and engage in meaningful discussions.

---

## Features

- **JWT Authentication (Email + Password Only)**
- **Role-based profiles** — Student / Alumni  
- **Social Feed** — posts, likes, comments & threaded replies  
- **Real-time chat** using Socket.IO  
- **Rich profiles** — skills, education, professional details  
- **Next.js Frontend + Node.js Backend + Prisma + MongoDB**

---

# Architecture Overview



---



```txt
+-------------------------+
|        Browser          |
|  - React UI             |
|  - Posts, Chat, Profile |
+------------+------------+
             |
     HTTPS calls + WebSockets
             |
+------------v-------------+
|     Frontend (Next.js)   |
|  - Routes & UI Components|
|  - Axios/fetch           |
|  - Socket.IO Client      |
+------------+-------------+
             |
    REST API + WebSocket
             |
+------------v-------------+
|   Backend (Node/Express) |
|  - JWT Auth Only         |
|  - REST API Modules      |
|  - Socket.IO Server      |
|  - Prisma ORM (MongoDB)  |
+------------+-------------+
             |
         MongoDB
```

---

# Tech Stack

## **Frontend**
- Next.js 15 (App Router)  
- React 19  
- Tailwind CSS  
- Axios  
- Framer Motion  
- Lucide Icons  
- Socket.IO Client  
- date-fns  

## **Backend**
- Node.js  
- Express 5  
- Prisma ORM (MongoDB)  
- JWT Authentication  
- Bcrypt (password hashing)  
- Socket.IO  
- CORS  
- Cookie Parser  
- Dotenv  
- Nodemon  

---

# Folder Structure

## **Backend — `/backend`**
```
backend/
index.js # Main server (Express + Socket.IO)

prisma/
schema.prisma # Prisma schema (MongoDB)

src/
lib/
prisma.js # Prisma client


features/
  auth/
    auth.controller.js
    auth.routes.js
    auth.service.js

  user/
    user.controller.js
    user.service.js
    user.routes.js

  posts/
    post.controller.js
    post.routes.js
    post.service.js

  comments/
    comments.controller.js
    comments.routes.js
    comments.service.js

  chat/
    chat.controller.js
    chat.routes.js
    chat.service.js
    chat.socket.js

sockets/
  index.js
.env
package.json
yaml
```



---

## **Frontend — `/frontend`**
```
frontend/
next.config.mjs
public/

src/
app/
layout.js
page.js


  login/
    page.jsx

  signup/
    page.jsx
    student/page.jsx
    alumni/page.jsx

  posts/
    page.jsx
    CreatePostForm.jsx
    PostCard.jsx

  chat/
    page.jsx

  profile/
    page.jsx

  create-profile/
    page.jsx

  choose-role/
    page.jsx

components/
  Navbar.js
  LandingPage.js

  chat/
    ChatWindow.jsx
    MessageInput.jsx
    MessageItem.jsx
    MessageList.jsx

  posts/
    CreatePostForm.jsx
    PostCard.jsx
    CommentList.jsx

  forms/
    StudentProfileForm.jsx
    AlumniProfileForm.jsx

context/
  UserContext.jsx

hooks/
  useSocket.js

utils/
  api.js
  socket.js
.env.local

yaml
```

---

# Environment Variables

## **Backend (`/backend/.env`)**

```env
PORT=3000
CLIENT_URL=http://localhost:3001

JWT_SECRET=your_jwt_secret_here

DATABASE_URL="mongodb+srv://<user>:<pass>@cluster/dbname"
```
## **Frontend (/frontend/.env.local)**
```
env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
**Local Setup**
# Getting Started

## 1. Clone the Repository
```bash
git clone <repo-url>
cd <project-folder>
🖥️ Backend Setup
bash
cd backend
npm install
npm start
Runs at: http://localhost:3000

💻 Frontend Setup
bash
cd frontend
npm install
npm run dev -- --port=3001
UI opens at: http://localhost:3001
```

REST API Endpoints
```
 Auth (/auth)
Method	Route	        Description
POST	/auth/register	Register user
POST	/auth/login	    Login user
```

 Users (/users)
```
Method	Route	              Description
GET	  /users/me	              Get logged-in user
PUT	  /users/set-role	      Set user role (student/alumni)
POST  /users/profile         Create profile
GET	  /users/:id	          Get user profile
GET	  /users/search/:query	  Search users
```
 Posts (/posts)
```
Method	Route	             Description
POST	 /posts	             Create a post
GET	   /posts	             Get all posts
POST	 /posts/:id/like	   Like a post
POST	 /posts/:id/unlike	 Unlike a post
```
 Comments (/api/comments)
```
Method	Route	                       Description
GET	   /api/posts/:postId/comments	   Get comments for a post
POST	/api/comments	                Add a comment
POST	/api/comments/:id/reply     	Reply to a comment
```
Chat (/api/chat)
```
Method	Route	                          Description
GET	   /api/chat/threads	              Get chat threads
POST	 /api/chat/threads	              Create chat thread
GET	   /api/chat/messages/:threadId	     Get messages
POST	 /api/chat/messages/:threadId	    Send message
```
**Socket.IO — Realtime Features**
```
Connect user

Join chat thread

Send new message

Receive message instantly

Typing indicators

Online/offline status
```
**Future Improvements**
```
Push notifications

Alumni verification (LinkedIn API)

Voice/video calls

Recommendation engine

Event management module
```
**Contributing**
```
Fork the repository

Create a new branch

Commit your changes

Open a pull request
```
**License**
```
MIT License ©️ Reunify
```
