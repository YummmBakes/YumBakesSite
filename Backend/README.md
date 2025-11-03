# YummBakes Backend - ASP.NET Core 8

## Project Structure

```
YummBakes.API/
├── Controllers/          # API endpoints
├── Models/              # EF Core entities
├── Data/               # DbContext and migrations
├── Services/           # Business logic
├── DTOs/              # Data transfer objects
├── Migrations/        # Database migrations
├── Program.cs         # Application startup
└── appsettings.json   # Configuration
```

## Setup Instructions

### Prerequisites
- Visual Studio 2022
- .NET 8 SDK
- SQL Server (Express or higher)

### Steps

1. **Open in Visual Studio**
   - Open Visual Studio
   - Select "Open a project or solution"
   - Navigate to `Backend/YummBakes.API/` and select the `.csproj` file

2. **Update Connection String**
   - Open `appsettings.json`
   - Update `ConnectionStrings:DefaultConnection` with your SQL Server details
   - Example: `Server=YOUR_SERVER;Database=YummBakesDB;Trusted_Connection=true;TrustServerCertificate=true;`

3. **Update JWT Settings**
   - In `appsettings.json`, update the `Jwt:SecretKey` with a strong 32+ character key

4. **Create Database**
   - Open Package Manager Console (Tools > NuGet Package Manager > Package Manager Console)
   - Run: `Update-Database`
   - This will apply all migrations and create the database

5. **Verify Database**
   - Open SQL Server Management Studio
   - Connect to your SQL Server
   - Verify `YummBakesDB` database exists

6. **Run the Application**
   - Press F5 or click "Start" in Visual Studio
   - Swagger UI will open at `https://localhost:5001/swagger`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Menu (Admin only for Create/Update/Delete)
- `GET /api/menu` - Get all menus
- `GET /api/menu/{id}` - Get menu by ID
- `POST /api/menu` - Create menu (Admin only)
- `PUT /api/menu/{id}` - Update menu (Admin only)
- `DELETE /api/menu/{id}` - Delete menu (Admin only)

### Category (Admin only for Create/Update/Delete)
- `GET /api/category` - Get all categories
- `GET /api/category/{id}` - Get category by ID
- `POST /api/category` - Create category (Admin only)
- `PUT /api/category/{id}` - Update category (Admin only)
- `DELETE /api/category/{id}` - Delete category (Admin only)

## Database Models

- **ApplicationUser** - Extended Identity user with additional fields
- **Category** - Menu categories
- **Menu** - Menu items with photos and pricing
- **Order** - Customer orders
- **OrderItem** - Individual items in an order

## Key Features

- JWT-based authentication
- Role-based access control (Admin, User)
- CRUD operations for menus and categories
- Entity Framework Core with Code First approach
- CORS enabled for frontend communication
- Swagger API documentation
