# YummBakes Frontend - React

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Header.jsx     # Navigation header
│   └── ProtectedRoute.jsx # Auth-protected routes
├── pages/             # Page components
│   ├── Home.jsx       # Landing page
│   ├── Login.jsx      # Login page
│   ├── Signup.jsx     # Registration page
│   ├── Menu.jsx       # Menu display page
│   └── Admin.jsx      # Admin dashboard
├── services/          # API communication services
│   ├── authService.js      # Authentication API calls
│   ├── menuService.js      # Menu API calls
│   └── categoryService.js  # Category API calls
├── context/           # React Context for state management
│   └── AuthContext.jsx     # Authentication context
├── hooks/             # Custom React hooks
│   └── useAuth.js     # Auth hook
├── utils/             # Utility functions
│   └── api.js         # Axios API configuration
└── styles/            # CSS files for components
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- VS Code (recommended)

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` with your backend API URL
   - Default: `http://localhost:5000/api`

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   - The app will open at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

## Features

- User authentication (login/signup)
- JWT token-based authentication
- Role-based access (Admin/User)
- Menu browsing for all users
- Admin dashboard for managing categories and menus
- Photo upload support
- Responsive design
- Token auto-refresh on 401 responses

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Token sent in Authorization header for all API requests
5. If token expires, user redirected to login

## Admin Features

- Create, edit, and delete menu categories
- Create, edit, and delete menu items
- Upload and manage product photos
- View all menus and categories

## Key Technologies

- React 18
- React Router DOM v6
- Axios for HTTP requests
- Context API for state management
- Vite as build tool

## API Configuration

The API client is configured in `src/utils/api.js`. It automatically:
- Adds JWT token to all requests
- Handles 401 responses by clearing storage and redirecting
- Sets correct headers for JSON communication

## Styling

- Custom CSS files for each component
- Consistent color scheme (YummBakes brand)
- Mobile responsive design
- Smooth transitions and animations
