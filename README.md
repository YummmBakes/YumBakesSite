# YummBakes - Home Bakery E-Commerce Platform

## 🍰 About YummBakes

YummBakes is a complete full-stack e-commerce platform for home bakers. It features user authentication, product management, admin controls, and a professional API.

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Visual Studio 2022
- SQL Server 2019+
- Node.js 16+

### Start Backend
1. Open Visual Studio
2. Open `Backend/YummBakes.API/YummBakes.API.csproj`
3. Press **F5**

### Start Frontend
1. Open terminal in project root
2. Run: `npm install && npm run dev`
3. Frontend opens at `http://localhost:5173`

### Test Login
- Email: `test@example.com`
- Password: `Test@123456`
- (Register first if needed)

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **QUICK_START.md** | 5-minute setup guide |
| **SETUP_GUIDE.md** | Complete installation steps |
| **FRONTEND_BACKEND_CONNECTION.md** | Connection troubleshooting |
| **CONNECTION_CHECKLIST.md** | Verification checklist |
| **TROUBLESHOOTING_FLOW.md** | Decision tree for issues |
| **CONNECTION_DIAGRAM.md** | Visual architecture |

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite + React Router
- **Backend**: ASP.NET Core 8 + Entity Framework Core
- **Database**: SQL Server
- **Auth**: JWT + ASP.NET Identity
- **API Docs**: Swagger/OpenAPI

---

## 📋 Features

### User Features
✅ Sign up and login
✅ View menu items
✅ Browse by category
✅ See product details and photos

### Admin Features
✅ Create/edit/delete categories
✅ Create/edit/delete menu items
✅ Upload product photos
✅ Admin dashboard

### Security
✅ Password hashing
✅ JWT authentication
✅ CORS protection
✅ Role-based access control

---

## 🔧 Configuration

### Frontend (.env)
```env
VITE_API_URL=https://localhost:7000/api
```

### Backend (appsettings.json)
- Update connection string
- Set JWT secret key (32+ characters)
- Configure CORS origins

---

## 📦 Project Structure

```
Frontend: src/
├── components/    # React components
├── pages/        # Page components
├── services/     # API calls
├── context/      # Auth state
├── hooks/        # Custom hooks
└── utils/        # Utilities

Backend: Backend/YummBakes.API/
├── Controllers/  # API endpoints
├── Models/      # Database entities
├── Services/    # Business logic
├── Data/        # DbContext
└── DTOs/        # Data transfer objects
```

---

## 🐛 Troubleshooting

**Login not working?**
1. Is backend running on port 7000?
2. Check `.env` has correct API URL
3. See TROUBLESHOOTING_FLOW.md for detailed steps

**CORS error?**
1. Backend needs frontend URL in CORS config
2. Update `appsettings.json`
3. Restart backend

---

## 🌐 Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 7000 | https://localhost:7000 |
| Swagger | 7000 | https://localhost:7000/swagger |

---

## 📖 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Menu
- `GET /api/menu` - Get all
- `POST /api/menu` - Create (Admin)
- `PUT /api/menu/{id}` - Update (Admin)
- `DELETE /api/menu/{id}` - Delete (Admin)

### Category
- `GET /api/category` - Get all
- `POST /api/category` - Create (Admin)
- `PUT /api/category/{id}` - Update (Admin)
- `DELETE /api/category/{id}` - Delete (Admin)

---

## 🚀 Next Steps

1. Complete QUICK_START.md
2. Test login functionality
3. Create admin account
4. Add menu categories
5. Add menu items
6. Deploy to production

---

## 📝 License

Educational project - YummBakes
