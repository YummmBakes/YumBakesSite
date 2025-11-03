import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import menuService from '../services/menuService';
import './Menu.css';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await menuService.getAll();
      setMenus(data);
    } catch (err) {
      setError('Failed to load menu items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading menu...</div>;

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        {isAdmin && (
          <button
            onClick={() => navigate('/admin/menu/add')}
            className="add-btn"
          >
            Add Item
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {menus.length === 0 ? (
        <div className="no-items">No menu items available yet</div>
      ) : (
        <div className="menu-grid">
          {menus.map(menu => (
            <div key={menu.id} className="menu-card">
              {menu.imageUrl && (
                <div className="menu-image">
                  <img src={menu.imageUrl} alt={menu.name} />
                </div>
              )}
              <div className="menu-content">
                <h3>{menu.name}</h3>
                <p className="category">{menu.categoryName}</p>
                <p className="description">{menu.description}</p>
                <div className="menu-footer">
                  <span className="price">${menu.price.toFixed(2)}</span>
                  {isAdmin && (
                    <div className="admin-actions">
                      <button
                        onClick={() => navigate(`/admin/menu/edit/${menu.id}`)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await menuService.delete(id);
      setMenus(menus.filter(m => m.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  }
};

export default Menu;
