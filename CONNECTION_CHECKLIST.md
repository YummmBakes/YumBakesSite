# Frontend-Backend Connection Checklist

## Pre-Flight Check

### Database Setup ✓
- [ ] SQL Server is installed and running
- [ ] Created database: `YummBakesDB`
- [ ] Run migrations: `Update-Database` (in Package Manager Console)
- [ ] Check tables exist in SQL Server Management Studio

### Backend Setup ✓
- [ ] Visual Studio 2022 opened
- [ ] Project opened: `Backend/YummBakes.API/YummBakes.API.csproj`
- [ ] NuGet packages restored
- [ ] Connection string updated in `appsettings.json`
- [ ] JWT secret key set (32+ characters)

### Frontend Setup ✓
- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Dependencies installed: `npm install`
- [ ] `.env` file exists with correct API URL
- [ ] `.env` not in `.gitignore`

---

## Startup Steps (In Order)

### 1️⃣ Start Backend (Required First)

- [ ] Open Visual Studio 2022
- [ ] File → Open Project/Solution → `Backend/YummBakes.API/YummBakes.API.csproj`
- [ ] Build → Clean Solution
- [ ] Build → Rebuild Solution
- [ ] Press **F5** or Debug → Start Debugging
- [ ] Wait for: `Now listening on: https://localhost:7000`
- [ ] Swagger opens automatically

### 2️⃣ Verify Backend Works

- [ ] Go to: `https://localhost:7000/swagger`
- [ ] Expand `/api/auth`
- [ ] Click `/auth/register` → Try it out
- [ ] Send test registration
- [ ] Should get: `"success": true`
- [ ] **If fails**: Check database connection

### 3️⃣ Check Frontend Configuration

- [ ] Open project root folder
- [ ] Check `.env` exists
- [ ] Content should be:
  ```
  VITE_API_URL=https://localhost:7000/api
  ```
- [ ] **If wrong port**: Update and save
- [ ] Close and reopen terminal for changes to apply

### 4️⃣ Start Frontend

- [ ] Open terminal/command prompt
- [ ] Navigate to project root: `cd /path/to/project`
- [ ] Run: `npm run dev`
- [ ] Wait for: `➜  Local: http://localhost:5173`
- [ ] Browser opens automatically

### 5️⃣ Test Login Flow

- [ ] Frontend opens at `http://localhost:5173`
- [ ] See home page with "Explore Our Menu"
- [ ] Click login or go to `/login`
- [ ] Enter test credentials:
  - Email: `test@example.com`
  - Password: `Test@123456`
- [ ] Click Login button

### Expected Behavior ✓

- [ ] No error messages appear
- [ ] Gets redirected to `/menu` page
- [ ] Top-right shows email instead of "Login/Signup"
- [ ] Can see menu items (if any exist)
- [ ] Logout button works

---

## If Login Fails - Troubleshooting

### Error: "Network Error" or "Failed to Fetch"

**Diagnostic Steps:**
1. [ ] Check backend is running: `https://localhost:7000`
2. [ ] Verify `.env` has: `VITE_API_URL=https://localhost:7000/api`
3. [ ] Open DevTools (F12) → Console
4. [ ] Try login again
5. [ ] Look for error message in console

**Solutions:**
- [ ] Restart backend (F5 in Visual Studio)
- [ ] Restart frontend (`Ctrl+C` then `npm run dev`)
- [ ] Accept HTTPS certificate: Go to `https://localhost:7000` → Proceed anyway
- [ ] Update `.env` if port is wrong

### Error: "CORS Error" or "Access to XMLHttpRequest blocked"

**Cause:** Backend CORS not configured for frontend

**Fix:**
1. [ ] Open `Backend/YummBakes.API/appsettings.json`
2. [ ] Check `Cors.AllowedOrigins` contains: `"http://localhost:5173"`
3. [ ] If missing, add it:
   ```json
   "Cors": {
     "AllowedOrigins": ["http://localhost:5173"]
   }
   ```
4. [ ] Save and restart backend (F5)

### Error: "401 Unauthorized" or "Invalid credentials"

**Cause:** User doesn't exist or wrong password

**Fix:**
1. [ ] Test registration first:
   - Go to `https://localhost:7000/swagger`
   - Expand `/auth/register`
   - Try registering new user
   - Should show `"success": true`
2. [ ] If registration fails:
   - Check database connection string
   - Run `Update-Database` in Package Manager Console
   - Restart backend
3. [ ] Try login again with registered credentials

### Error: "404 Not Found" or wrong endpoint

**Cause:** Backend URL or endpoint wrong

**Fix:**
- [ ] Verify `.env`: `VITE_API_URL=https://localhost:7000/api`
- [ ] Check backend is running on 7000
- [ ] In Swagger, verify endpoint exists: `/api/auth/login`
- [ ] Restart frontend after `.env` change

---

## Debug Checklist

### Browser DevTools (F12)

**Console Tab:**
- [ ] Check for red error messages
- [ ] Look for "API Error" logs
- [ ] Note the error details

**Network Tab:**
- [ ] Refresh page
- [ ] Try login
- [ ] Look for `/api/auth/login` request
- [ ] Click on it
- [ ] Check Status column:
  - 200 = Server responded (but might be error in data)
  - 400 = Bad request (wrong data sent)
  - 401 = Unauthorized
  - 403 = Forbidden
  - 404 = Endpoint not found
  - 0 = Can't reach backend

**Application Tab:**
- [ ] Click LocalStorage
- [ ] After login, should see `token` and `user` keys
- [ ] If missing, token didn't save

### Backend Logs

**Visual Studio Output:**
- [ ] View → Output
- [ ] Select "Show output from: Debug"
- [ ] Look for errors when frontend calls API
- [ ] Note any exceptions

---

## Common Mistakes

### ❌ Mistake 1: .env file not updated

**Problem:** Frontend uses wrong API URL

**Fix:**
```
Edit .env and set:
VITE_API_URL=https://localhost:7000/api
```

### ❌ Mistake 2: .env changed but frontend not restarted

**Problem:** Old URL still used

**Fix:**
```bash
Ctrl+C in terminal
npm run dev
```

### ❌ Mistake 3: Backend running on different port

**Problem:** API URL doesn't match actual backend port

**Fix:**
- Check Visual Studio output for actual port
- Update `.env` to match
- Restart frontend

### ❌ Mistake 4: Database not created

**Problem:** "Connection timeout" errors

**Fix:**
```
In Visual Studio Package Manager Console:
Update-Database
```

### ❌ Mistake 5: User not registered

**Problem:** "Invalid email or password"

**Fix:**
1. Go to `https://localhost:7000/swagger`
2. Register new user first
3. Use registered credentials to login

### ❌ Mistake 6: CORS not configured

**Problem:** "Access to XMLHttpRequest blocked"

**Fix:**
1. Add frontend URL to `appsettings.json`:
   ```json
   "Cors": {
     "AllowedOrigins": ["http://localhost:5173"]
   }
   ```
2. Restart backend

---

## Success Indicators

When everything works, you should see:

✅ **Backend Running**
- Visual Studio shows green play button
- Output shows "Now listening on: https://localhost:7000"
- `https://localhost:7000/swagger` loads

✅ **Frontend Running**
- Terminal shows `➜  Local: http://localhost:5173`
- Browser opens frontend automatically

✅ **API Communication**
- No red errors in browser console
- Network tab shows `/api/auth/login` with status 200

✅ **Login Works**
- Enter credentials and click Login
- Redirects to `/menu` page
- Email shows in top-right header
- Can navigate to other pages

✅ **Storage Saved**
- Open DevTools → Application → LocalStorage
- See `token` and `user` entries
- Logout clears both

---

## Quick Reference

| Component | Default Location | Port | URL |
|-----------|------------------|------|-----|
| Frontend | /src | 5173 | http://localhost:5173 |
| Backend | /Backend/YummBakes.API | 7000 | https://localhost:7000 |
| Swagger | Backend | 7000 | https://localhost:7000/swagger |
| Database | SQL Server | 1433 | YummBakesDB |

---

## Files to Check

### Frontend
- [ ] `.env` - API URL configuration
- [ ] `src/utils/api.js` - Axios setup
- [ ] `src/pages/Login.jsx` - Login logic
- [ ] `src/context/AuthContext.jsx` - Auth state

### Backend
- [ ] `appsettings.json` - Connection string & CORS
- [ ] `Program.cs` - Middleware setup
- [ ] `Controllers/AuthController.cs` - Login endpoint
- [ ] `Services/AuthService.cs` - Auth logic

---

## When Stuck

1. **Take a screenshot** of the error
2. **Check browser console** (F12 → Console)
3. **Check network tab** for API response
4. **Check backend output** in Visual Studio
5. **Review** FRONTEND_BACKEND_CONNECTION.md
6. **Verify** all checklist items above

---

## Next Steps After Success

1. [ ] Create admin account (via Swagger or database)
2. [ ] Create menu categories
3. [ ] Add menu items with photos
4. [ ] Test full user flow
5. [ ] Test admin features
6. [ ] Deploy to production

---

## Support Resources

| Document | Purpose |
|----------|---------|
| QUICK_START.md | 5-minute setup |
| FRONTEND_BACKEND_CONNECTION.md | Detailed troubleshooting |
| CONNECTION_DIAGRAM.md | Visual architecture |
| SETUP_GUIDE.md | Complete installation |

---

## Reset Everything (Nuclear Option)

If nothing works:

```bash
# Frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

```powershell
# Backend (in Visual Studio)
Build → Clean Solution
Build → Rebuild Solution
Package Manager Console: Update-Database
Press F5
```

```bash
# Browser
Clear cache (Ctrl+Shift+Delete)
Open incognito window
Try again
```
