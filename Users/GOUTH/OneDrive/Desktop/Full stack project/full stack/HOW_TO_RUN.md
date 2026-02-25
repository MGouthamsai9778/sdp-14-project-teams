# 🚀 HOW TO RUN YOUR LMS PROJECT

## ⚡ QUICK START (3 Steps - 30 seconds)

### Step 1: Backend Terminal
```powershell
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\backend"
npm run dev
```
**You'll see**: `LMS Backend running on http://localhost:5000`

### Step 2: Frontend Terminal (New Terminal)
```powershell
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\frontend"
npm start
```
**You'll see**: React compiling and browser opens to http://localhost:3000

### Step 3: Access Your App
- **Open Browser**: http://localhost:3000
- **Register/Login**: Create account or login
- **Done!** 🎉

---

## 📖 DETAILED INSTRUCTIONS

### SETUP (One Time Only - First Run)

**Option A: Automatic Setup (Easiest)**
```powershell
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack"
SETUP.bat
```

**Option B: Manual Setup**

```powershell
# Install backend dependencies
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\backend"
npm install

# Install frontend dependencies
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\frontend"
npm install
```

---

### RUNNING THE PROJECT (Every Time)

**Terminal 1 - Backend Server**
```powershell
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\backend"
npm run dev
```

**Terminal 2 - Frontend Server** (Open new terminal)
```powershell
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\frontend"
npm start
```

---

## 🌐 ACCESS YOUR APP

| Service | URL | Port |
|---------|-----|------|
| **Frontend App** | http://localhost:3000 | 3000 |
| **Backend API** | http://localhost:5000/api | 5000 |
| **Health Check** | http://localhost:5000/api/health | 5000 |

---

## ✅ VERIFY EVERYTHING IS RUNNING

### Check Backend
```powershell
curl http://localhost:5000/api/health
```
**Expected Response**: `{"message":"LMS Backend is running"}`

### Check Frontend
Open browser: http://localhost:3000
**Expected**: Login page appears with register option

---

## 🧪 FIRST TIME TESTING

1. **Go To**: http://localhost:3000
2. **Click "Register"**
3. **Fill Form**:
   ```
   First Name: John
   Last Name: Doe
   Email: john@test.com
   Password: test123
   Role: student
   ```
4. **Click "Register"** ✅
5. **Login** with same credentials ✅
6. **See Dashboard** 🎓

---

## 🛑 STOPPING THE SERVERS

**Press in each terminal**: `Ctrl + C`

Or close the terminals.

---

## 🔄 RESTARTING

Just repeat the "RUNNING THE PROJECT" section:

**Terminal 1**:
```powershell
cd backend && npm run dev
```

**Terminal 2**:
```powershell
cd frontend && npm start
```

---

## ⚠️ COMMON ISSUES & FIXES

### Backend Won't Start
```powershell
# Make sure you're in backend folder
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\backend"

# Clear node_modules and reinstall
rmdir node_modules -Force
npm install --legacy-peer-deps
npm run dev
```

### Frontend Won't Start
```powershell
# Make sure you're in frontend folder
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack\frontend"

# Clear node_modules and reinstall
rmdir node_modules -Force
npm install
npm start
```

### Port Already in Use
```powershell
# Find process using port 5000 or 3000 and kill it
# Or change backend port in backend/.env:
PORT=5001
```

### Can't Connect Frontend to Backend
1. Check backend is running: http://localhost:5000/api/health
2. Check frontend .env has: `REACT_APP_API_URL=http://localhost:5000/api`
3. Clear browser cache: Ctrl+Shift+Delete

---

## 📁 PROJECT STRUCTURE

```
Full Stack Project/
├── backend/                    ← Express Server (Port 5000)
│   ├── src/
│   │   ├── server.js          ← Main entry point
│   │   ├── models/            ← Database models
│   │   ├── controllers/       ← Business logic
│   │   ├── routes/            ← API endpoints
│   │   └── middleware/        ← Auth middleware
│   ├── package.json
│   ├── .env                   ← Configuration
│   └── npm run dev            ← Start backend
│
├── frontend/                   ← React App (Port 3000)
│   ├── src/
│   │   ├── App.js             ← Main component
│   │   ├── pages/             ← Pages (Login, Register, Dashboard)
│   │   ├── components/        ← Reusable components
│   │   └── services/          ← API calls
│   ├── package.json
│   ├── .env                   ← Configuration
│   └── npm start              ← Start frontend
│
└── Documentation/              ← Guides & docs
    ├── README.md
    ├── API_DOCUMENTATION.md
    ├── QUICK_START.md
    └── More...
```

---

## 🎯 COMMANDS CHEAT SHEET

```powershell
# Navigate to project
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack"

# Backend Commands
cd backend
npm install                    # Install dependencies
npm run dev                    # Start with auto-reload
npm start                      # Start production

# Frontend Commands
cd ..\frontend
npm install                    # Install dependencies
npm start                      # Start dev server
npm run build                  # Build for production

# Check if ports are free
netstat -ano | findstr :5000   # Check port 5000
netstat -ano | findstr :3000   # Check port 3000
```

---

## 🌍 WHAT EACH SERVER DOES

### Backend (Port 5000)
- Handles API requests
- Manages database (currently in-memory)
- Authenticates users
- Processes courses, assignments, etc.

### Frontend (Port 3000)
- React web application
- User interface
- Connects to backend via HTTP
- Shows dashboards, forms, etc.

---

## 💾 DATA PERSISTENCE

### Current Mode: In-Memory Storage ⚠️
- Users saved during session only
- Data lost if backend restarts
- Perfect for testing

### Upgrade to MongoDB (Optional)
- Data persists permanently
- See MONGODB_SETUP.md for instructions
- Only 5 minutes to set up
- No code changes needed!

---

## 🧪 TEST ACCOUNTS (Create Your Own!)

After running the project, you can register:

```
Student Account:
  Email: student@lms.com
  Password: pass123
  Role: student

Instructor Account:
  Email: instructor@lms.com
  Password: pass123
  Role: instructor

Admin Account:
  Email: admin@lms.com
  Password: pass123
  Role: admin

Creator Account:
  Email: creator@lms.com
  Password: pass123
  Role: content_creator
```

---

## 📝 TYPICAL WORKFLOW

### FIRST TIME
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start

# Browser
http://localhost:3000
```

### EVERY OTHER TIME
Just repeat the "RUNNING THE PROJECT" section above!

---

## ✨ THAT'S IT!

Your LMS is ready to run! 

### Quick Summary:
1. **Terminal 1**: `cd backend && npm run dev`
2. **Terminal 2**: `cd frontend && npm start`
3. **Browser**: Open http://localhost:3000
4. **Register/Login**: Create account and start using!

---

## 🚀 YOU'RE READY!

Go run your project and test all features! 

**Questions?** Check:
- README.md (overview)
- QUICK_START.md (setup)
- API_DOCUMENTATION.md (endpoints)
- TESTING_GUIDE.md (test scenarios)

