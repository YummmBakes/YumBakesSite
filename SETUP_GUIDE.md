# YummBakes - Complete Setup Guide

## Overview

YummBakes is a home baker e-commerce platform with:
- **Frontend**: React with Vite
- **Backend**: ASP.NET Core 8 with SQL Server
- **Database**: SQL Server with Entity Framework Core Code First
- **Authentication**: JWT-based with ASP.NET Identity

---

## Backend Setup (ASP.NET Core 8)

### Prerequisites
- Visual Studio 2022
- .NET 8 SDK
- SQL Server 2019+ or SQL Server Express

### Installation Steps

1. **Open Backend Project**
   - Open Visual Studio 2022
   - File → Open → Project/Solution
   - Navigate to `Backend/YummBakes.API/YummBakes.API.csproj`
   - Click Open

2. **Restore NuGet Packages**
   - Solution should automatically restore packages
   - If not, right-click Solution → Restore NuGet Packages

3. **Configure Database Connection**
   - Open `appsettings.json`
   - Update connection string:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=.;Database=YummBakesDB;Trusted_Connection=true;TrustServerCertificate=true;"
     }
     ```
   - Replace `.` with your SQL Server name if needed
   - Example: `Server=DESKTOP-ABC\\SQLEXPRESS;`

4. **Configure JWT Settings**
   - In `appsettings.json`, update:
     ```json
     "Jwt": {
       "SecretKey": "YourVeryLongSecureKeyWith32OrMoreCharacters!",
       "Issuer": "YummBakesAPI",
       "Audience": "YummBakesApp",
       "ExpirationMinutes": 60
     }
     ```
   - Use a strong, random key (min 32 characters)

5. **Create Database**
   - View → Other Windows → Package Manager Console
   - Run: `Update-Database`
   - This creates the database and applies migrations

6. **Verify Database**
   - Open SQL Server Management Studio
   - Connect to your server
   - Verify `YummBakesDB` exists
   - Check for tables: AspNetUsers, Categories, Menus, Orders, etc.

7. **Create Admin User (Optional)**
   - After first run, you can create an admin user via the API
   - Or add manually in the database

8. **Run Backend**
   - Press F5 or Debug → Start Debugging
   - Backend runs on `https://localhost:5001`
   - Swagger UI available at `https://localhost:5001/swagger`

---

## Frontend Setup (React)

### Prerequisites
- Node.js 16+ (download from nodejs.org)
- npm (comes with Node.js)
- VS Code or any code editor

### Installation Steps

1. **Navigate to Frontend Directory**
   ```bash
   cd path/to/project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Update if needed:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```
   - Note: Update port if backend runs on different port

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`
   - Automatically opens in browser

5. **Build for Production**
   ```bash
   npm run build
   ```
   - Creates optimized build in `dist/` folder

---

## Project Structure

### Backend Files
```
Backend/YummBakes.API/
├── Controllers/          # API endpoints
│   ├── AuthController.cs
│   ├── MenuController.cs
│   └── CategoryController.cs
├── Models/              # Entity models
│   ├── ApplicationUser.cs
│   ├── Menu.cs
│   ├── Category.cs
│   ├── Order.cs
│   └── OrderItem.cs
├── Services/           # Business logic
│   └── AuthService.cs
├── Data/              # Database context
│   └── ApplicationDbContext.cs
├── DTOs/             # Data Transfer Objects
│   ├── RegisterDto.cs
│   ├── LoginDto.cs
│   ├── AuthResponseDto.cs
│   ├── MenuDto.cs
│   └── CategoryDto.cs
├── Program.cs        # Startup configuration
└── appsettings.json  # Configuration
```

### Frontend Files
```
src/
├── components/
│   ├── Header.jsx
│   ├── Header.css
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Home.css
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Auth.css
│   ├── Menu.jsx
│   ├── Menu.css
│   ├── Admin.jsx
│   └── Admin.css
├── services/
│   ├── authService.js
│   ├── menuService.js
│   └── categoryService.js
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── utils/
│   └── api.js
├── App.jsx
├── App.css
└── index.css
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Menu (Admin only for Create/Update/Delete)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/menu` | Get all menus |
| GET | `/api/menu/{id}` | Get menu by ID |
| POST | `/api/menu` | Create menu |
| PUT | `/api/menu/{id}` | Update menu |
| DELETE | `/api/menu/{id}` | Delete menu |

### Category (Admin only for Create/Update/Delete)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/category` | Get all categories |
| GET | `/api/category/{id}` | Get category by ID |
| POST | `/api/category` | Create category |
| PUT | `/api/category/{id}` | Update category |
| DELETE | `/api/category/{id}` | Delete category |

---

## Authentication Flow

### Registration
1. User provides email, password, name, phone
2. System checks if email exists
3. Creates new user with hashed password
4. Assigns "User" role by default
5. Returns success message

### Login
1. User provides email and password
2. System validates credentials
3. Generates JWT token (valid for 60 minutes)
4. Returns token and user data
5. Frontend stores token in localStorage

### Protected Routes
- All authenticated endpoints require JWT token in Authorization header
- Format: `Bearer {token}`
- Admin endpoints additionally check for "Admin" role

---

## Testing

### Backend Testing
1. Run backend (F5 in Visual Studio)
2. Open Swagger UI: `https://localhost:5001/swagger`
3. Test endpoints directly from browser

### Frontend Testing
1. Run frontend (`npm run dev`)
2. Test user flows:
   - Signup new account
   - Login with credentials
   - View menu items
   - Admin: Create/edit/delete categories and menus

### Test Credentials
After setup, create test admin:
- Email: admin@yummbakes.com
- Password: Admin@123456

---

## Common Issues

### Backend Issues

**Issue**: Connection string error
- **Solution**: Verify SQL Server is running and connection string is correct

**Issue**: 401 Unauthorized on API calls
- **Solution**: Ensure JWT token is passed in Authorization header

**Issue**: Database migration errors
- **Solution**: Delete database and run `Update-Database` again

### Frontend Issues

**Issue**: API calls failing
- **Solution**:
  - Check backend is running on port 5000
  - Verify `VITE_API_URL` in `.env` is correct
  - Check CORS settings in backend

**Issue**: Can't login after signup
- **Solution**: Verify backend database has user record

**Issue**: Build errors with dependencies
- **Solution**: Delete `node_modules` and `package-lock.json`, run `npm install` again

---

## Production Deployment

### Backend
1. Publish from Visual Studio (Release configuration)
2. Use strong JWT secret key
3. Configure production database connection
4. Set appropriate CORS origins

### Frontend
1. Run `npm run build`
2. Deploy `dist/` folder to web server
3. Configure API URL for production backend
4. Ensure CORS allows production domain

---

## File Organization Notes

The project follows clean architecture principles:
- Separation of concerns (Controllers, Services, Models)
- DTOs for API contracts
- Context API for state management
- Service layer for API communication
- Custom hooks for code reuse

---

## Next Steps

1. Complete database setup
2. Run backend and verify Swagger docs
3. Run frontend and test authentication flow
4. Create categories and menu items through admin
5. Test full user journey

---

## Support

For issues:
1. Check error messages in console
2. Review logs in Visual Studio (backend)
3. Check browser console (frontend)
4. Verify database schema matches models
5. Ensure all dependencies are installed
