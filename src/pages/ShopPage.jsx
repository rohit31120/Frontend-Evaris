import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/pages/ShopPage.css';

const ShopPage = () => {
  const { addToCart } = useCart();
  return (
    <div className="shop-page">
      <Header />
      
      <div className="shop-header">
        <div className="shop-header-container">
          <div className="shop-header-content">
            <h1 className="shop-header-title">Shop All Products</h1>
            <p className="shop-header-description">
              Discover our complete range of premium skincare products designed to give you radiant, healthy skin
            </p>
          </div>
          
          <div className="filter-bar">
            <div className="filter-group">
              <span className="filter-label">Category:</span>
              <select className="filter-select">
                <option>All Products</option>
                <option>Face Care</option>
                <option>Body Care</option>
                <option>Serums</option>
                <option>Moisturizers</option>
              </select>
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Sort by:</span>
              <select className="filter-select">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name</option>
              </select>
            </div>
            
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
              />
              <button className="search-button">Search</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card" data-product-id={product.id}>
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
                  
                  <div className="product-ingredients">
                    {product.keyIngredients.slice(0, 2).map((ingredient, index) => (
                      <span key={index} className="product-ingredient-tag">
                        {ingredient.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="product-footer">
                    <div>
                      <span className="product-price">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="product-original-price">₹{product.originalPrice}</span>
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
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
