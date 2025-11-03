# Quick Start - Frontend & Backend Connection

## 5-Minute Setup

### Step 1: Start Backend (Visual Studio)

1. Open Visual Studio 2022
2. Open project: `Backend/YummBakes.API/YummBakes.API.csproj`
3. Press **F5** to run
4. Wait for message: "Now listening on: https://localhost:7000"
5. Swagger UI opens automatically at `https://localhost:7000/swagger`

### Step 2: Verify Backend Works

1. In Swagger UI, expand `/api/auth`
2. Click "Try it out" on `/auth/register`
3. Enter test user:
   ```json
   {
     "email": "test@example.com",
     "password": "Test@123456",
     "firstName": "Test",
     "lastName": "User",
     "phoneNumber": "555-1234"
   }
   ```
4. Click Execute
5. Should see: `"success": true`

### Step 3: Configure Frontend

1. Check `.env` file has:
   ```
   VITE_API_URL=https://localhost:7000/api
   ```

2. If not, update it and save

### Step 4: Start Frontend

1. Open terminal/command prompt
2. Navigate to project folder
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Frontend opens at `http://localhost:5173`

### Step 5: Test Login

1. Go to `http://localhost:5173/login`
2. Enter credentials (from Step 3):
   - Email: `test@example.com`
   - Password: `Test@123456`
3. Click Login

**Expected Result:**
- ✓ Redirect to Menu page
- ✓ See "Explore Our Menu" button
- ✓ Top-right shows your email instead of Login/Signup

---

## If Login Fails

### Check 1: Verify Backend URL

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try login
4. Look for error message
5. Check if it mentions the URL

**If URL is wrong:**
- Update `.env` file
- Restart frontend (`Ctrl+C` then `npm run dev`)

### Check 2: Clear Cache

1. Delete `.env.local` if exists
2. Restart frontend
3. Try login again

### Check 3: HTTPS Certificate

1. In browser, go to `https://localhost:7000`
2. You'll see certificate warning
3. Click "Advanced" → "Proceed anyway"
4. Go back to `http://localhost:5173`
5. Try login again

### Check 4: Check Network Request

1. DevTools → Network tab
2. Try login
3. Look for `/api/auth/login` request
4. Click on it
5. Check Status:
   - **200**: Success (but something else wrong)
   - **400**: Bad data (wrong email/password)
   - **0**: Can't reach backend (wrong URL or backend down)

---

## File Locations to Check

| What | Where |
|------|-------|
| Frontend URL config | `.env` |
| API communication | `src/utils/api.js` |
| Login logic | `src/pages/Login.jsx` |
| Auth storage | `src/context/AuthContext.jsx` |
| Backend config | `Backend/YummBakes.API/appsettings.json` |
| Backend CORS | `Backend/YummBakes.API/appsettings.json` (Cors section) |

---

## Troubleshooting Commands

### Reset Everything

**Frontend:**
```bash
# Clean node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Start dev server
npm run dev
```

**Backend:**
1. In Visual Studio: Build → Clean Solution
2. Build → Rebuild Solution
3. Press F5 to start

### Check Backend Database

In Visual Studio Package Manager Console:
```powershell
# See all migrations
Get-Migration

# Apply all migrations
Update-Database

# See users
Add-Migration CheckUsers
```

---

## Success Indicators

✓ Backend running on port 7000
✓ Frontend running on port 5173
✓ `.env` has correct API URL
✓ Login page loads
✓ Swagger API test works
✓ Login redirects to Menu
✓ Email shows in header
✓ Can view menu items

---

## Next: Create Admin Account

After successful login:

1. Go to `https://localhost:7000/swagger`
2. Expand `/api/auth`
3. Use the `AssignRole` endpoint (if available)
4. Or manually in database:
   - Open SQL Server Management Studio
   - Find user in `AspNetUsers` table
   - Add Admin role through Identity setup

---

## Ports Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 7000 | https://localhost:7000 |
| Swagger | 7000 | https://localhost:7000/swagger |

---

## Need More Help?

See detailed guide: `FRONTEND_BACKEND_CONNECTION.md`
