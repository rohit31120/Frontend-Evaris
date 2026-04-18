import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchFeaturedProducts } from '../data/productsBackend';
import logo from '../assets/images/logo/logo.jpeg';
import heroImage from '../assets/images/products/p-7.jpeg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Use cart context
  const { addToCart } = useCart();

  // Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts({ limit: 3 }); // Get first 3 products for featured section
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Search functionality
  const handleSearchChange = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    try {
      const searchResults = await fetchProducts({ search: query, limit: 10 });
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  // User profile functionality
  const handleUserProfile = () => {
    console.log('User profile clicked');
  };
  return (
    <div className="homepage">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero Background Image */}
        <div 
          className="hero-background"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-badge">LUXURY SKINCARE</div>
              <h1 className="hero-title">Discover Your Natural Glow</h1>
              <p className="hero-description">
                Experience luxury skincare with EVARIS. Our scientifically-formulated products combine nature's finest ingredients with cutting-edge technology for radiant, healthy skin.
              </p>
              <div className="hero-buttons">
                <Link to="/shop" className="hero-button-primary">Shop Now</Link>
                <Link to="/about" className="hero-button-secondary">Learn More</Link>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-image-circle">
                <img 
                  src={heroImage} 
                  alt="EVARIS Skincare" 
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-indicators">
        <div className="trust-container">
          <div className="trust-item">
            <div className="trust-number">50K+</div>
            <div className="trust-label">Happy Customers</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">4.9</div>
            <div className="trust-label">Average Rating</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">100%</div>
            <div className="trust-label">Natural Ingredients</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="featured-container">
          <div className="featured-header">
            <h2 className="featured-title">Featured Products</h2>
            <p className="featured-description">
              Discover our best-selling skincare essentials
            </p>
          </div>
          
          <div className="products-grid">
            {loading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="product-card skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-button"></div>
                  </div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    {product.badge && (
                      <div className="product-badge">
                        {product.badge}
                      </div>
                    )}
                    <button className="product-wishlist-button">
                      <span style={{ fontSize: '18px', color: '#8B6914' }}>+</span>
                    </button>
                  </div>
                  
                  <div className="product-content">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    {/* Key Ingredients */}
                    <div className="product-ingredients">
                      {product.keyIngredients && product.keyIngredients.slice(0, 2).map((ingredient, index) => (
                        <span key={index} className="product-ingredient-tag">
                          {ingredient.name}
                        </span>
                      ))}
                    </div>
                    
                    <div className="product-footer">
                      <div>
                        <span className="product-price">Rs.{product.price}</span>
                        {product.originalPrice && (
                          <span className="product-original-price">Rs.{product.originalPrice}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="product-add-to-cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="all-products-preview">
        <div className="all-products-container">
          <div className="all-products-header">
            <h2 className="all-products-title">All Products</h2>
            <p className="all-products-description">
              Complete skincare routine with our full range of premium products
            </p>
            <Link to="/shop" className="all-products-button">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
