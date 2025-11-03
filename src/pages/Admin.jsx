import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import categoryService from '../services/categoryService';
import './Admin.css';

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await categoryService.delete(id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  if (loading) return <div className="loading">Loading admin panel...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-section">
        <div className="section-header">
          <h2>Categories</h2>
          <button
            onClick={() => navigate('/admin/category/add')}
            className="add-btn"
          >
            Add Category
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="no-items">No categories yet</div>
        ) : (
          <div className="categories-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>{cat.description || '-'}</td>
                    <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        onClick={() => navigate(`/admin/category/edit/${cat.id}`)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-section">
        <div className="section-header">
          <h2>Menu Items</h2>
          <Link to="/admin/menu" className="view-link">
            View All
          </Link>
        </div>
        <p>Manage menu items and their photos</p>
      </div>
    </div>
  );
};

export default Admin;
