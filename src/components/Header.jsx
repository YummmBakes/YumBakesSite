import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>YummBakes</h1>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>

          {isAdmin && (
            <Link to="/admin" className="nav-link admin-link">Admin</Link>
          )}

          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">{user?.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link login-link">Login</Link>
                <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
