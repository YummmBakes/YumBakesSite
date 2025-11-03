# Frontend-Backend Connection Diagram

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Frontend - React App                                    │   │
│  │  http://localhost:5173                                   │   │
│  │                                                          │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Login Component                                  │ │   │
│  │  │  ├─ Input: email, password                        │ │   │
│  │  │  └─ Action: Call authService.login()             │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │           ↓ (HTTP POST)                                   │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  API Client (axios)                               │ │   │
│  │  │  ├─ URL: VITE_API_URL + /auth/login              │ │   │
│  │  │  ├─ Headers: Content-Type, Authorization         │ │   │
│  │  │  └─ Body: {email, password}                      │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │           ↓↑                                              │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Config (.env)                                    │ │   │
│  │  │  VITE_API_URL=https://localhost:7000/api         │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                            ↓
                    HTTPS Request (7000)
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│                  SERVER (Backend)                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  ASP.NET Core 8 API                                      │   │
│  │  https://localhost:7000                                  │   │
│  │                                                          │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Auth Controller                                  │ │   │
│  │  │  POST /api/auth/login                             │ │   │
│  │  │  ├─ Receive: email, password                      │ │   │
│  │  │  └─ Action: Call AuthService                      │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │           ↓                                               │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Auth Service                                     │ │   │
│  │  │  ├─ Find user by email                           │ │   │
│  │  │  ├─ Verify password hash                         │ │   │
│  │  │  ├─ Check if active                             │ │   │
│  │  │  └─ Generate JWT token                          │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │           ↓                                               │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Database (SQL Server)                           │ │   │
│  │  │  ├─ AspNetUsers table                            │ │   │
│  │  ├─ Find user record                               │ │   │
│  │  └─ Return user data                               │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │           ↓                                               │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Response (JSON)                                 │ │   │
│  │  │  {                                                │ │   │
│  │  │    "success": true,                              │ │   │
│  │  │    "token": "eyJhbGc...",                        │ │   │
│  │  │    "user": {                                      │ │   │
│  │  │      "id": "...",                                │ │   │
│  │  │      "email": "test@example.com",                │ │   │
│  │  │      "roles": ["User"]                           │ │   │
│  │  │    }                                              │ │   │
│  │  │  }                                                │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                            ↓
                    HTTPS Response (200 OK)
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│                  BROWSER (Client) - Response                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  API Response Handler                                    │   │
│  │  ├─ Status: 200 OK                                       │   │
│  │  ├─ Parse JSON response                                  │   │
│  │  └─ Extract: token, user data                           │   │
│  └────────────────────────────────────────────────────────────┘ │
│           ↓                                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Auth Context                                              │   │
│  │  ├─ Save token to localStorage                            │   │
│  │  ├─ Save user to localStorage                             │   │
│  │  └─ Update auth state                                     │   │
│  └────────────────────────────────────────────────────────────┘ │
│           ↓                                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Navigation                                                │   │
│  │  ├─ Redirect to /menu                                     │   │
│  │  └─ Show menu items                                       │   │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Login Request

```
User Types Credentials
        ↓
Form Validation
        ↓
authService.login(email, password)
        ↓
Axios POST Request
        ↓
Add headers:
├─ Content-Type: application/json
└─ Authorization: Bearer {token}  (if exists)
        ↓
Send to: https://localhost:7000/api/auth/login
        ↓
Backend Receives
        ↓
AuthController.Login()
        ↓
AuthService.LoginAsync()
├─ Find user
├─ Check password
└─ Generate token
        ↓
Return Response:
├─ success: true
├─ token: JWT_TOKEN
└─ user: USER_DATA
        ↓
Frontend Receives Response
        ↓
Parse JSON
        ↓
authContext.login(user, token)
        ↓
Save to localStorage:
├─ localStorage.setItem('token', token)
└─ localStorage.setItem('user', JSON.stringify(user))
        ↓
Update State
        ↓
Navigate to /menu
        ↓
Success ✓
```

---

## Configuration Points

### Frontend Configuration

```
.env
├─ VITE_API_URL
│  └─ Must match backend URL and port
│     Example: https://localhost:7000/api
```

### Backend Configuration

```
appsettings.json
├─ ConnectionStrings
│  └─ DefaultConnection (SQL Server)
├─ Jwt
│  ├─ SecretKey (for token signing)
│  ├─ Issuer
│  ├─ Audience
│  └─ ExpirationMinutes
└─ Cors
   └─ AllowedOrigins (must include frontend URL)
      Example: http://localhost:5173
```

---

## Request/Response Example

### Request
```
POST /api/auth/login HTTP/1.1
Host: localhost:7000
Content-Type: application/json
Origin: http://localhost:5173

{
  "email": "test@example.com",
  "password": "Test@123456"
}
```

### Response (Success)
```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:5173

{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "phoneNumber": "555-1234",
    "roles": ["User"]
  }
}
```

### Response (Failure)
```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Port & Protocol Summary

| Service | Protocol | Host | Port | Full URL |
|---------|----------|------|------|----------|
| Frontend | HTTP | localhost | 5173 | http://localhost:5173 |
| Backend API | HTTPS | localhost | 7000 | https://localhost:7000 |
| Backend API (HTTP) | HTTP | localhost | 5000 | http://localhost:5000 |
| Swagger Docs | HTTPS | localhost | 7000 | https://localhost:7000/swagger |
| Database | - | . (local) | 1433 | Server=.; |

---

## Key Files

### Frontend
- **API Client**: `src/utils/api.js`
- **Login Page**: `src/pages/Login.jsx`
- **Auth Context**: `src/context/AuthContext.jsx`
- **Config**: `.env`

### Backend
- **Auth Controller**: `Backend/YummBakes.API/Controllers/AuthController.cs`
- **Auth Service**: `Backend/YummBakes.API/Services/AuthService.cs`
- **Config**: `Backend/YummBakes.API/appsettings.json`
- **Startup**: `Backend/YummBakes.API/Program.cs`

---

## Error Handling Flow

```
API Request
        ↓
Response Interceptor
├─ If 2xx (Success)
│  └─ Return response
├─ If 401 (Unauthorized)
│  ├─ Clear localStorage
│  ├─ Redirect to /login
│  └─ Reject promise
└─ If 4xx/5xx (Error)
   └─ Reject promise
        ↓
Catch Block
├─ Get error message
├─ Display to user
└─ Log to console
```

---

## Token Usage in Subsequent Requests

```
After Login Success

localStorage contains:
├─ token: "eyJhbGc..."
└─ user: {...}

Every Subsequent Request:
├─ Request Interceptor runs
├─ Get token from localStorage
├─ Add to headers: Authorization: Bearer {token}
├─ Send request
└─ Backend validates token
   ├─ If valid: Process request
   └─ If invalid: Return 401
```

---

## Troubleshooting Checklist

```
❌ Login doesn't work
├─ ❓ Is backend running?
│  └─ Check: https://localhost:7000 loads
├─ ❓ Is .env configured?
│  └─ Check: VITE_API_URL=https://localhost:7000/api
├─ ❓ Is CORS enabled?
│  └─ Check: appsettings.json includes localhost:5173
├─ ❓ Is database created?
│  └─ Check: SQL Server has YummBakesDB
├─ ❓ Does user exist?
│  └─ Check: Swagger test registration works
└─ ❓ Check browser console
   └─ Look for: API Error details
```
