# 🎓 AlumniConnect — Verified Student & Alumni Networking Platform

**AlumniConnect** is a secure networking, mentorship, and collaboration platform designed exclusively for college students and alumni.  
All users are verified through **college email domain authentication**, ensuring a trusted and authentic community.

---

## 🚀 Vision
To build a verified network where alumni and students can meaningfully connect for mentorship, opportunities, collaboration, and career growth.

---

## ✨ Core Features

---

## 🧑‍🎓 Students

### 🔐 Secure Login & Email Verification
- JWT-based authentication  
- Only verified college domain emails are allowed (e.g., `@college.edu`)  
- Ensures a safe, gated community

### 👤 Profile Creation
Students can create detailed profiles including:
- Education  
- Skills  
- Projects  
- Bio  
- Interests  
- Career goals  

### 🔍 Discover & Connect
- Search alumni by company, domain, expertise, location, or higher studies  
- Search students by batch, skills, and interests  

### 💬 Chat & Collaboration
- 1:1 chat
- Group discussions
- **Reddit-style open chat threads**: anyone can post, reply, and upvote
- Infinite nested replies to threads (recursive message tree)
- Upvotes for messages/comments (toggle, live)
- Real-time messaging and live updates via **Socket.io**

### 🎯 Smart Recommendations
- Suggested alumni based on interests, skills, and career journey

---

## 🧑‍💼 Alumni

### 🧾 Simple Onboarding
- Create profile by verifying college email  
- Add educational + professional background  
- Define areas of help (career, higher studies, interview prep, referrals, etc.)

### 📅 Mentorship Preferences
- Choose availability  
- Pick engagement type:  
  - 1:1 chat  
  - Group guidance  
  - General Q&A threads  

### 💼 Opportunities
- Post job opportunities or internship referrals  
- Share industry insights and guidance  

### 🤝 Alumni Networking
- Connect with fellow alumni for collaboration and growth  

---

## 🌟 Platform-Wide Highlights
- 🔒 Verified users only (based on email domain)
- 🧵 Reddit-style threaded discussions (open to all, infinite nesting)
- ▲ Upvotes for messages/comments (toggle, live)
- 💬 Real-time chat and live updates using Socket.io
- 🧭 Structured mentorship flow
- 🏅 Gamification: badges like “Top Mentor”, “Rising Student”
- 👥 Groups for study, projects, hackathons, and clubs

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (React) + Tailwind CSS + socket.io-client + date-fns |
| **Backend** | Node.js + Express.js + Socket.io |
| **Database** | MongoDB Atlas (Prisma ORM) |
| **Authentication** | JWT + College Email Domain Verification |
| **Real-time Messaging** | Socket.io |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend) |

---

## 🧩 Database Models (Prisma)

Key models include:
- **User** – student/alumni profile
- **Thread** – open chat threads (Reddit-style)
- **Message** – nested messages (parentId for infinite replies, upvotes as array of userIds)
- **Post** – job posts or announcements
- **Comment** – interactions on posts

MongoDB is managed through **Prisma ORM** for type-safe queries and schema validation.

---

## 🌱 MVP Scope
- JWT authentication
- College email domain verification
- Profile creation
- Student ↔ Alumni messaging
- Group chat / threaded forum (Reddit-like)
- **Open chat threads with infinite nested replies and upvotes**
- Real-time updates via Socket.io
- Job/referral posting
- Recommendations

---

## 🔮 Future Enhancements
- AI-based match recommendations
- Session scheduling with alumni
- Video mentorship calls
- Events & webinars
- Leaderboard & activity insights
- Advanced analytics for admins
- Pagination and "load more" for threads/messages
- Optimistic UI for chat/upvotes
- User avatars and profile links in chat

---

## 👥 Contributors

| Name | Role | GitHub |
|------|------|---------|
| **Saad Arqam** | Developer & Designer | https://github.com/SaadArqam |
| **Priyabrata Singh** | Developer & Designer | https://github.com/CodyBrat |
| **Premansh Behl** | Developer & Designer | https://github.com/PremanshBehl |
| **Pathan Amaan** | Developer & Designer | https://github.com/Amaan-pathan |

---

## 📄 License
This project is licensed under the **MIT License**.

---

### ⭐ If you found this project useful, please consider giving it a star on GitHub!
