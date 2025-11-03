# Frontend to Backend Connection Guide

## Current Configuration

### Frontend Environment
- **Location**: `/src`
- **Port**: `http://localhost:5173`
- **API URL**: Configured in `.env`

### Backend API
- **Location**: `/Backend/YummBakes.API`
- **Default HTTPS Port**: `https://localhost:7000`
- **Default HTTP Port**: `http://localhost:5000`
- **API Base**: `/api`

---

## Step 1: Configure Environment

### Update `.env` File

```env
VITE_API_URL=https://localhost:7000/api
```

**OR if using HTTP:**
```env
VITE_API_URL=http://localhost:5000/api
```

> **Note**: After changing `.env`, restart frontend with `npm run dev`

---

## Step 2: Verify Backend is Running

### Check Backend Status

1. **Backend should be running in Visual Studio**
   - Press F5 or click Start
   - Look for: `Now listening on: https://localhost:7000`
   - Swagger UI: `https://localhost:7000/swagger`

2. **Test API Endpoint Directly**
   - Open in browser: `https://localhost:7000/swagger`
   - Try to register/login through Swagger
   - This confirms backend is working

---

## Step 3: Verify CORS Configuration

The backend CORS is configured for:
- `http://localhost:5173` (Frontend)
- `http://localhost:3000` (Alternative)

If your frontend runs on a different port, update `appsettings.json`:

```json
"Cors": {
  "AllowedOrigins": ["http://localhost:5173", "http://localhost:YOUR_PORT"]
}
```

Then restart backend.

---

## Step 4: Test Connection

### Method 1: Using Browser Console

1. Open frontend: `http://localhost:5173`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try login
5. Check console for errors

### Method 2: Check Network Tab

1. In DevTools, go to Network tab
2. Try login
3. Look for request to `/api/auth/login`
4. Check response status:
   - **200**: Success
   - **400**: Bad request (check data)
   - **404**: Endpoint not found (check URL)
   - **0/Failed**: Connection error (check backend URL)

### Method 3: Direct API Test

Open Postman or use curl:

```bash
curl -X POST https://localhost:7000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123456"}'
```

---

## Common Connection Issues & Solutions

### Issue 1: "Network Error" or "Failed to Fetch"

**Possible Causes:**
1. Backend not running
2. Wrong port in `.env`
3. HTTPS certificate error (development)

**Solutions:**
- Verify backend is running on correct port
- Check `.env` has correct URL
- For HTTPS errors, accept self-signed certificate:
  - Navigate to `https://localhost:7000` in browser
  - Click "Advanced" → "Proceed anyway"
  - Then try login in app

### Issue 2: "CORS Error"

**Error Message:**
```
Access to XMLHttpRequest at 'https://localhost:7000/api/auth/login'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solutions:**
1. Check backend CORS configuration in `appsettings.json`
2. Add frontend URL to allowed origins:
   ```json
   "Cors": {
     "AllowedOrigins": ["http://localhost:5173"]
   }
   ```
3. Restart backend
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue 3: "401 Unauthorized"

**Causes:**
1. Invalid credentials
2. User doesn't exist
3. Backend database issue

**Solutions:**
1. Verify user exists in database
2. Check password is correct
3. Try registering new user first
4. Check backend logs for errors

### Issue 4: "404 Not Found"

**Causes:**
1. Wrong API endpoint
2. Backend not running
3. Wrong port in `.env`

**Solutions:**
1. Check endpoint URL in `.env`
2. Verify backend is running (`https://localhost:7000/swagger`)
3. Verify controller exists: `AuthController`
4. Check routing in `Program.cs`

### Issue 5: "Invalid Token" After Login

**Causes:**
1. Token not saved correctly
2. localStorage disabled
3. Token formatting issue

**Solutions:**
1. Check DevTools → Application → LocalStorage
2. Look for `token` and `user` keys
3. Verify browser localStorage is enabled
4. Check browser console for errors

---

## Debugging Steps

### Step 1: Check Backend Logs

In Visual Studio:
- View → Output
- Select "Show output from: Debug"
- Watch for errors when frontend calls API

### Step 2: Check Frontend Console

In Browser:
- F12 → Console tab
- Look for error messages
- Check Network tab for failed requests

### Step 3: Check Network Requests

In Browser DevTools:
1. Network tab
2. Try login
3. Look for request to `/api/auth/login`
4. Click on request
5. Check:
   - **Request**: URL, method, headers, body
   - **Response**: Status, headers, body

### Step 4: Test with Swagger

1. Go to `https://localhost:7000/swagger`
2. Try `/auth/login` endpoint
3. If it works in Swagger but not frontend, issue is frontend-side
4. If it fails in Swagger, issue is backend-side

---

## Development Certificates (HTTPS)

For HTTPS development on localhost:

### Windows
```bash
dotnet dev-certs https --trust
```

### Mac/Linux
```bash
dotnet dev-certs https --trust
```

This creates and trusts a local development certificate.

---

## Quick Checklist

- [ ] Backend running in Visual Studio
- [ ] Backend port correct (7000 for HTTPS)
- [ ] `.env` file has correct `VITE_API_URL`
- [ ] Frontend restarted after `.env` change
- [ ] CORS origins include frontend URL
- [ ] Swagger API works (`https://localhost:7000/swagger`)
- [ ] Browser accepts HTTPS certificate
- [ ] localStorage enabled in browser
- [ ] No console errors when trying login
- [ ] Network request shows in DevTools

---

## Port Reference

| Service | Default Port | URL |
|---------|-------------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend (HTTPS) | 7000 | https://localhost:7000 |
| Backend (HTTP) | 5000 | http://localhost:5000 |
| Swagger | 7000 | https://localhost:7000/swagger |

---

## Testing Credentials

### Register New User
- Email: `test@example.com`
- Password: `Test@123456`
- Name: `Test User`

### Default Admin (After creation)
- Email: `admin@yummbakes.com`
- Password: `Admin@123456`

---

## File Locations

- **Frontend API Config**: `src/utils/api.js`
- **Frontend Login**: `src/pages/Login.jsx`
- **Frontend Auth Context**: `src/context/AuthContext.jsx`
- **Backend Auth Service**: `Backend/YummBakes.API/Services/AuthService.cs`
- **Backend CORS Config**: `Backend/YummBakes.API/appsettings.json`
- **Frontend Env**: `.env`

---

## If Still Not Working

1. **Clear Everything**
   ```bash
   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Restart Backend**
   - Stop (Shift+F5)
   - Clean solution (Build → Clean Solution)
   - Rebuild (Build → Rebuild Solution)
   - Start (F5)

3. **Check Browser**
   - Clear cache (Ctrl+Shift+Delete)
   - Try incognito/private window
   - Try different browser

4. **Database Check**
   - Verify database exists
   - Run: `Update-Database` in Package Manager Console
   - Check user table has data

5. **Network Check**
   - Disable VPN/Proxy
   - Check firewall allows ports 7000 and 5173
   - Try mobile on same network

---

## Next Steps After Successful Login

1. Token stored in localStorage
2. User data available in context
3. Can navigate to Menu page
4. Can access admin features if admin role
5. Token automatically sent with all API requests
