# Frontend-Backend Connection - Troubleshooting Flow

## Decision Tree

```
START: Login Not Working
│
├─ Step 1: Is Backend Running?
│  │
│  ├─ NO →
│  │  ├─ Open Visual Studio
│  │  ├─ Open Backend/YummBakes.API/YummBakes.API.csproj
│  │  ├─ Press F5
│  │  └─ Proceed to Step 2
│  │
│  └─ YES → Proceed to Step 2
│
├─ Step 2: Can You Access Swagger?
│  │
│  ├─ Go to: https://localhost:7000/swagger
│  │
│  ├─ Error Page / Certificate Warning →
│  │  ├─ Click "Advanced"
│  │  ├─ Click "Proceed anyway"
│  │  └─ Proceed to Step 3
│  │
│  ├─ Swagger Loads →
│  │  └─ Proceed to Step 3
│  │
│  └─ Can't Connect →
│     ├─ Backend not running: Go back to Step 1
│     ├─ Wrong port: Check Visual Studio output
│     └─ Firewall: Check Windows Defender
│
├─ Step 3: Test Backend with Swagger
│  │
│  ├─ Expand: /api/auth
│  ├─ Click: /auth/register
│  ├─ Try It Out
│  ├─ Send:
│  │  {
│  │    "email": "test@example.com",
│  │    "password": "Test@123456",
│  │    "firstName": "Test",
│  │    "lastName": "User",
│  │    "phoneNumber": "555-1234"
│  │  }
│  │
│  ├─ Success (200) →
│  │  └─ Proceed to Step 4
│  │
│  └─ Failure (400/500) →
│     ├─ Error: "Database connection" → Update-Database
│     ├─ Error: "User already exists" → Use different email
│     └─ Other error → Check backend console
│
├─ Step 4: Is .env Configured?
│  │
│  ├─ Open file: .env
│  │
│  ├─ Contains:
│  │  VITE_API_URL=https://localhost:7000/api
│  │  ├─ YES → Proceed to Step 5
│  │  └─ NO →
│  │     ├─ Update to correct URL
│  │     ├─ Save file
│  │     └─ Proceed to Step 5
│  │
│  └─ File doesn't exist →
│     ├─ Copy .env.example to .env
│     ├─ Edit .env
│     ├─ Set: VITE_API_URL=https://localhost:7000/api
│     └─ Proceed to Step 5
│
├─ Step 5: Restart Frontend
│  │
│  ├─ In terminal where `npm run dev` is running:
│  ├─ Press: Ctrl+C
│  ├─ Wait for: prompt returns
│  ├─ Run: npm run dev
│  ├─ Wait for: ➜ Local: http://localhost:5173
│  │
│  └─ Proceed to Step 6
│
├─ Step 6: Try Login Again
│  │
│  ├─ Go to: http://localhost:5173/login
│  ├─ Email: test@example.com
│  ├─ Password: Test@123456
│  ├─ Click: Login
│  │
│  ├─ Success (redirect to /menu) →
│  │  └─ ✅ WORKING - Skip to End
│  │
│  └─ Failure →
│     └─ Proceed to Step 7
│
├─ Step 7: Check Browser Console
│  │
│  ├─ Press: F12
│  ├─ Go to: Console tab
│  ├─ Try login again
│  ├─ Look for error message
│  │
│  ├─ Error contains "CORS" →
│  │  ├─ Open: Backend/YummBakes.API/appsettings.json
│  │  ├─ Find: "Cors" section
│  │  ├─ Add: "http://localhost:5173" to AllowedOrigins
│  │  ├─ Save and restart backend
│  │  └─ Try login again
│  │
│  ├─ Error contains "404" or "not found" →
│  │  ├─ Check .env API URL
│  │  ├─ Make sure backend is running on 7000
│  │  ├─ Restart frontend if .env changed
│  │  └─ Try login again
│  │
│  ├─ Error contains "Network" or "Failed to fetch" →
│  │  ├─ Backend might be down: Restart backend
│  │  ├─ Or wrong URL in .env
│  │  ├─ Check: https://localhost:7000 in browser
│  │  └─ Try login again
│  │
│  └─ Other error →
│     ├─ Copy full error text
│     ├─ Note the error in REQUEST tab
│     └─ Proceed to Step 8
│
├─ Step 8: Check Network Request
│  │
│  ├─ Press: F12
│  ├─ Go to: Network tab
│  ├─ Refresh page: F5
│  ├─ Try login
│  ├─ Look for: /api/auth/login request
│  ├─ Click on it
│  ├─ Check Status column:
│  │
│  ├─ Status 200 →
│  │  ├─ Response is successful
│  │  ├─ Check LocalStorage (Step 9)
│  │  └─ Issue is in response handling
│  │
│  ├─ Status 400 →
│  │  ├─ Bad request - wrong data sent
│  │  ├─ Check email/password
│  │  ├─ Try Swagger first
│  │  └─ Try login again
│  │
│  ├─ Status 401 →
│  │  ├─ Wrong credentials
│  │  ├─ User doesn't exist
│  │  ├─ Register new user in Swagger first
│  │  └─ Use registered credentials
│  │
│  ├─ Status 0 / FAILED →
│  │  ├─ Can't reach backend
│  │  ├─ Check backend is running
│  │  ├─ Check port is 7000
│  │  ├─ Check .env URL
│  │  └─ Restart backend and frontend
│  │
│  └─ Other status →
│     ├─ Click on request
│     ├─ Go to Response tab
│     ├─ Check error details
│     └─ Note error for debugging
│
├─ Step 9: Check LocalStorage
│  │
│  ├─ Press: F12
│  ├─ Go to: Application tab
│  ├─ Click: LocalStorage
│  ├─ Expand: http://localhost:5173
│  │
│  ├─ See "token" and "user" keys →
│  │  ├─ Token saved successfully
│  │  ├─ Check values are non-empty
│  │  └─ Issue might be in navigation
│  │
│  └─ Don't see them →
│     ├─ Token not saving
│     ├─ Check browser allows localStorage
│     ├─ Try incognito window
│     └─ Check frontend code: src/context/AuthContext.jsx
│
└─ Step 10: Advanced Debugging
   │
   ├─ Clear Everything:
   │  ├─ Frontend:
   │  │  ├─ rm -rf node_modules package-lock.json
   │  │  ├─ npm install
   │  │  └─ npm run dev
   │  │
   │  ├─ Backend:
   │  │  ├─ Build → Clean Solution
   │  │  ├─ Build → Rebuild Solution
   │  │  ├─ Package Manager Console: Update-Database
   │  │  └─ F5 to run
   │  │
   │  └─ Browser:
   │     ├─ Ctrl+Shift+Delete (Clear Cache)
   │     ├─ Open new incognito window
   │     └─ Try login
   │
   └─ If Still Not Working:
      ├─ Document all errors
      ├─ Screenshot console errors
      ├─ Screenshot network request
      ├─ Check all files in troubleshooting
      └─ Check FRONTEND_BACKEND_CONNECTION.md
```

---

## Command Reference

### Terminal Commands

```bash
# Frontend
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
Ctrl+C                  # Stop dev server

# After changing .env
npm run dev             # Restart to apply changes
```

### Visual Studio (Backend)

```
F5                      # Start debugging
Shift+F5                # Stop debugging
Build → Clean Solution  # Clean all
Build → Rebuild Solution # Full rebuild
View → Output           # Show debug output
```

### Package Manager Console (Backend)

```powershell
Update-Database         # Create/update database
Get-Migration          # List migrations
Add-Migration          # Create new migration
```

---

## Quick Fixes (Copy-Paste)

### Fix 1: Update .env

Open `.env` and set:
```
VITE_API_URL=https://localhost:7000/api
```

### Fix 2: Update CORS

Open `Backend/YummBakes.API/appsettings.json` and find:
```json
"Cors": {
  "AllowedOrigins": ["http://localhost:5173", "http://localhost:3000"]
}
```

If localhost:5173 missing, add it.

### Fix 3: Create Database

In Visual Studio Package Manager Console:
```powershell
Update-Database
```

### Fix 4: Clean Install Frontend

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Fix 5: Accept HTTPS Certificate

1. Go to `https://localhost:7000` in browser
2. See certificate warning
3. Click "Advanced"
4. Click "Proceed anyway"
5. Go back to frontend
6. Try login

---

## Symptoms & Solutions

| Symptom | Possible Cause | Solution |
|---------|---|---|
| "Network Error" | Backend not running | Start backend (F5 in VS) |
| "Failed to fetch" | Wrong API URL | Update .env, restart frontend |
| "CORS Error" | CORS not configured | Add localhost:5173 to appsettings.json, restart backend |
| "404 Not Found" | Wrong endpoint | Check .env URL, verify backend running |
| "Invalid credentials" | User doesn't exist | Register new user in Swagger first |
| "Certificate error" | Self-signed cert | Go to https://localhost:7000, accept warning |
| No error but no login | Token not saving | Check localStorage enabled, check browser console |
| Token in storage but not logged in | Navigation issue | Check frontend routing, check auth context |

---

## Verification Checklist

Use this to verify everything is working:

```
□ Backend URL in browser loads: https://localhost:7000
□ Swagger page loads: https://localhost:7000/swagger
□ Swagger test register works (status 200)
□ .env file has: VITE_API_URL=https://localhost:7000/api
□ Frontend loads: http://localhost:5173
□ Frontend login page loads: http://localhost:5173/login
□ Browser console has no red errors after trying login
□ Network tab shows /api/auth/login request
□ Request has status 200
□ Response contains token and user data
□ LocalStorage shows token and user keys
□ Login redirects to /menu
□ Email shows in top-right header
□ Logout button works
□ Can refresh page and still logged in
```

If all checked ✓ → Connection working!

---

## When Everything Still Fails

1. **Document everything:**
   - Screenshot of error
   - Console error text
   - Network request status
   - .env content
   - appsettings.json CORS section

2. **Try nuclear option:**
   ```bash
   # Completely remove and reinstall frontend
   rm -rf node_modules package-lock.json dist .env
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Restart everything:**
   - Close Visual Studio completely
   - Close all terminals
   - Restart computer (if necessary)
   - Open Visual Studio
   - Start backend (F5)
   - Open new terminal
   - Start frontend (npm run dev)

4. **Check basics:**
   - Database exists: Open SQL Server Management Studio
   - Port 7000 available: No other apps using it
   - Port 5173 available: No other apps using it
   - Firewall not blocking: Check Windows Defender

---

## Success Message

You'll know it works when:

✅ Can go to http://localhost:5173/login
✅ Enter test@example.com / Test@123456
✅ Click Login
✅ Immediately redirected to http://localhost:5173/menu
✅ Page shows menu items
✅ Top right shows: test@example.com | Logout
✅ Browser DevTools console shows NO red errors
✅ Browser LocalStorage shows token and user data

**Enjoy YummBakes!** 🍰
