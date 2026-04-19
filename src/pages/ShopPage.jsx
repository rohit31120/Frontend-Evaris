import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { products as staticProducts } from '../data/products';
import p1 from '../assets/images/products/p-1.jpeg';
import p2 from '../assets/images/products/p-2.jpeg';
import p3 from '../assets/images/products/p-3.jpeg';
import p4 from '../assets/images/products/p-4.jpeg';
import p5 from '../assets/images/products/p-5.jpeg';
import p6 from '../assets/images/products/p-6.jpeg';
import p7 from '../assets/images/products/p-7.jpeg';
import p8 from '../assets/images/products/p-8.jpeg';
import p9 from '../assets/images/products/p-9.jpeg';
import p10 from '../assets/images/products/p-10.jpeg';
import '../styles/pages/ShopPage.css';

const ShopPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to map database products to proper image paths
  const mapProductImages = (dbProducts) => {
    return dbProducts.map(product => {
      // Create name mapping for better matching
      const nameMap = {
        'EVARIS SKIN LIGHTENING CREAM': 'EVARIS SKIN LIGHTENING CREAM',
        'EVARIS FACE WASH': 'EVARIS KLASHH FACEWASH',
        'EVARIS MOISTURIZER': 'EVARIS BARRIER REPAIR MOISTURIZER',
        'EVARIS SERUM': 'EVARIS VITAMIN C SERUM',
        'EVARIS SUNSCREEN': 'EVARIS SUNSCREEN GEL',
        'EVARIS NIGHT CREAM': 'EVARIS NIGHT REPAIR CREAM',
        'EVARIS EYE CREAM': 'EVARIS EYE LIFT CREAM',
        'EVARIS LIP BALM': 'EVARIS LIP CARE BALM',
        'EVARIS BODY LOTION': 'EVARIS BODY LOTION',
        'EVARIS HAIR OIL': 'EVARIS HAIR OIL'
      };
      
      const mappedName = nameMap[product.name] || product.name;
      
      // Find matching static product by mapped name
      const staticProduct = staticProducts.find(sp => 
        sp.name.toLowerCase() === mappedName.toLowerCase()
      );
      
      if (staticProduct) {
        return {
          ...product,
          image: staticProduct.image
        };
      }
      
      // Fallback: try to construct image path from database image
      if (product.image) {
        // Convert /assets/images/products/p-1.jpeg to proper import
        const imageName = product.image.split('/').pop();
        const staticImageProduct = staticProducts.find(sp => 
          sp.image && sp.image.includes(imageName)
        );
        
        if (staticImageProduct) {
          return {
            ...product,
            image: staticImageProduct.image
          };
        }
      }
      
      // Final fallback - use appropriate image based on product type
      const imageMap = {
        'EVARIS SKIN LIGHTENING CREAM': p1,
        'EVARIS FACE WASH': p3,
        'EVARIS MOISTURIZER': p2,
        'EVARIS SERUM': p4,
        'EVARIS SUNSCREEN': p5,
        'EVARIS NIGHT CREAM': p6,
        'EVARIS EYE CREAM': p7,
        'EVARIS LIP BALM': p8,
        'EVARIS BODY LOTION': p9,
        'EVARIS HAIR OIL': p10
      };
      
      return {
        ...product,
        image: imageMap[product.name] || staticProducts[0]?.image || p1
      };
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Add timeout to prevent infinite loading
        const timeout = setTimeout(() => {
          setLoading(false);
          setError('Request timed out. Please refresh the page.');
        }, 10000); // 10 second timeout
        const response = await productsAPI.getAll();
        clearTimeout(timeout);
        
        if (response.success) {
          const mappedProducts = mapProductImages(response.data || []);
          setProducts(mappedProducts);
        } else {
          setError('Failed to fetch products');
          setProducts([]);
        }
      } catch (error) {
        setError('Failed to fetch products');
        // Don't add fallback products - show only real database products
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="shop-page">
      <Header />
      
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'black', 
          color: 'white', 
          padding: '10px', 
          fontSize: '12px',
          zIndex: 9999,
          borderRadius: '5px'
        }}>
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
          <div>Error: {error ? error : 'None'}</div>
          <div>Products: {products.length}</div>
        </div>
      )}
      
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
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No Products Available</h3>
              <p>There are currently no products available. Please check back later.</p>
              <button onClick={() => window.location.reload()} className="retry-btn">Refresh</button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
              <div key={product.id} className="product-card" data-product-id={product.id}>
                <div className="product-image-container">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image || '/assets/images/products/default.jpg'}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = '/assets/images/products/default.jpg';
                      }}
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
                    {product.ingredients && (
                      <span className="product-ingredient-tag">
                        {product.ingredients.split(',').slice(0, 2).join(', ')}
                      </span>
                    )}
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
