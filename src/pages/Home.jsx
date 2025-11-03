import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to YummBakes</h1>
          <p>Handcrafted baked goods made with love and the finest ingredients</p>
          <Link to="/menu" className="cta-button">
            Explore Our Menu
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/3407627/pexels-photo-3407627.jpeg?w=600&h=400&fit=crop"
            alt="Delicious baked goods"
          />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🍰</div>
          <h3>Premium Quality</h3>
          <p>Made with the finest ingredients and traditional recipes</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Fresh baked goods delivered to your doorstep</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h3>Made with Love</h3>
          <p>Every item is crafted with care and passion</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
