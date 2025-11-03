# YummBakes - START HERE

Welcome to YummBakes! Your complete home bakery e-commerce platform is ready.

---

## 📋 First Things First

1. **Read**: This file (START_HERE.md) - 2 minutes
2. **Run**: QUICK_START.md - 5 minutes
3. **Debug**: If issues, use TROUBLESHOOTING_FLOW.md

---

## 🚀 What You Have

✅ **Backend API** (ASP.NET Core 8)
- Complete REST API with JWT authentication
- Database models ready
- Admin controls for products
- Swagger documentation

✅ **Frontend App** (React + Vite)
- User login/signup
- Product browsing
- Admin dashboard
- Professional design

✅ **Database** (SQL Server)
- Schema ready
- User management
- Product management
- Order tracking

✅ **Documentation**
- Quick start guide
- Complete setup guide
- Troubleshooting guide
- Connection diagrams

---

## ⚡ Get Started (5 Minutes)

### Step 1: Start Backend
```
1. Open Visual Studio 2022
2. Open: Backend/YummBakes.API/YummBakes.API.csproj
3. Press F5
4. Wait for: "Now listening on: https://localhost:7000"
```

### Step 2: Start Frontend
```
1. Open terminal in project root
2. npm install
3. npm run dev
4. Frontend opens at http://localhost:5173
```

### Step 3: Test Login
```
1. Go to login page
2. Email: test@example.com
3. Password: Test@123456
4. (Register first if needed)
```

---

## 📚 Documentation Map

**Choose your path:**

### Path 1: "Just Get It Running" (Quick)
→ Read: **QUICK_START.md** (5 min)
→ Go: Start backend and frontend
→ Test: Login with test@example.com

### Path 2: "I Want to Understand Everything" (Detailed)
→ Read: **README.md** (Overview)
→ Read: **SETUP_GUIDE.md** (Full setup)
→ Read: **CONNECTION_DIAGRAM.md** (Architecture)
→ Run: Backend and frontend

### Path 3: "Something's Broken" (Troubleshooting)
→ Read: **TROUBLESHOOTING_FLOW.md** (Decision tree)
→ Follow: Steps and fixes
→ If still broken: **FRONTEND_BACKEND_CONNECTION.md** (Detailed help)

---

## 🎯 Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 7000 | https://localhost:7000 |
| Swagger Docs | 7000 | https://localhost:7000/swagger |
| Database | 1433 | SQL Server |

---

## 🔑 Test Credentials

**After setup, use these to test:**
- Email: `test@example.com`
- Password: `Test@123456`

**Note**: User may need to register first

---

## ⚙️ Current Configuration

✅ Frontend configured to use backend at `https://localhost:7000/api`
✅ Backend configured for database `YummBakesDB`
✅ JWT authentication ready
✅ CORS configured for `localhost:5173`
✅ Swagger docs enabled

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Login doesn't work | Backend running? Check `https://localhost:7000` |
| CORS error | Restart backend after checking `.env` URL |
| "Failed to fetch" | Update `.env` if backend port changed |
| Certificate warning | Click "Advanced" → "Proceed anyway" |
| Can't find user | Register first via `https://localhost:7000/swagger` |

**More issues?** → See TROUBLESHOOTING_FLOW.md

---

## 📁 Files You Need to Know

### Frontend Configuration
```
.env - API URL configuration
```

### Backend Configuration
```
Backend/YummBakes.API/appsettings.json - Database & CORS settings
```

### Key Frontend Files
```
src/pages/Login.jsx - Login page
src/context/AuthContext.jsx - Authentication
src/utils/api.js - API client
```

### Key Backend Files
```
Backend/YummBakes.API/Program.cs - Startup
Backend/YummBakes.API/Controllers/AuthController.cs - Login/Register
Backend/YummBakes.API/appsettings.json - Settings
```

---

## ✅ Success Checklist

You'll know it's working when you can:

- [ ] Start backend without errors
- [ ] Access `https://localhost:7000`
- [ ] View Swagger at `https://localhost:7000/swagger`
- [ ] Start frontend without errors
- [ ] See homepage at `http://localhost:5173`
- [ ] Go to login page
- [ ] Enter credentials and login
- [ ] Get redirected to menu page
- [ ] See email in top-right corner
- [ ] See logout button

**All checked?** You're ready to go! 🎉

---

## 🎨 Next Steps After Setup

1. **Test the system** - Login and explore
2. **Create admin account** - Via database or API
3. **Add menu categories** - Cakes, Pastries, etc.
4. **Add menu items** - With photos and prices
5. **Customize colors** - YummBakes theme is set
6. **Deploy to production** - When ready

---

## 📖 Complete Documentation List

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **START_HERE.md** | This file - orientation | 2 min |
| **QUICK_START.md** | 5-minute setup | 5 min |
| **SETUP_GUIDE.md** | Complete installation | 15 min |
| **README.md** | Project overview | 5 min |
| **FRONTEND_BACKEND_CONNECTION.md** | Connection guide | 10 min |
| **CONNECTION_CHECKLIST.md** | Verification steps | 5 min |
| **TROUBLESHOOTING_FLOW.md** | Problem solving | 10 min |
| **CONNECTION_DIAGRAM.md** | Visual architecture | 5 min |
| **SOLUTION_SUMMARY.txt** | Complete summary | 10 min |
| **Backend/README.md** | Backend docs | 5 min |
| **Frontend-README.md** | Frontend docs | 5 min |

---

## 💡 Pro Tips

1. **Always start backend first** - Frontend depends on it
2. **Check Swagger** - If API isn't working, test in Swagger first
3. **Use DevTools** - F12 in browser to debug connection issues
4. **Read the error** - Error messages usually tell you what's wrong
5. **Restart services** - Many issues fixed by restarting backend/frontend
6. **Clear cache** - Ctrl+Shift+Delete in browser if stuck

---

## 🆘 Need Help?

1. **For setup issues**: QUICK_START.md
2. **For connection issues**: TROUBLESHOOTING_FLOW.md
3. **For detailed help**: FRONTEND_BACKEND_CONNECTION.md
4. **For architecture**: CONNECTION_DIAGRAM.md
5. **For everything**: SETUP_GUIDE.md

---

## 🎉 Ready?

**→ Go to QUICK_START.md and follow the 5-minute setup**

The system will guide you through the rest!

---

## 📊 Project Status

✅ Backend API: Complete
✅ Frontend App: Complete
✅ Database Schema: Ready
✅ Authentication: Configured
✅ Documentation: 11 guides
✅ Build Status: Passing

**Status: READY TO USE**

---

## Questions?

Everything you need is in the documentation files. Pick the one that matches your situation:

- **Want quick setup?** → QUICK_START.md
- **Confused about connection?** → TROUBLESHOOTING_FLOW.md
- **Want to understand architecture?** → CONNECTION_DIAGRAM.md
- **Need detailed help?** → FRONTEND_BACKEND_CONNECTION.md

---

## Final Notes

- Your `.env` file is already configured
- Your backend port is 7000
- Your frontend port is 5173
- Your database name is YummBakesDB
- Everything is set up and ready to run

**Just start the backend and frontend!**

Good luck with YummBakes! 🍰

---

**Last Updated**: 2025-11-03
**Status**: Ready for production
**Version**: 1.0 Complete
