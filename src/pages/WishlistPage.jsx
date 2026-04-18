import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import '../styles/pages/WishlistPage.css';

const WishlistPage = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading wishlist from localStorage
    const savedWishlist = localStorage.getItem('evaris-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist:', error);
        setWishlist([]);
      }
    }
    setLoading(false);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('evaris-wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCartFromWishlist = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  const moveAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product);
    });
    setWishlist([]);
    localStorage.setItem('evaris-wishlist', JSON.stringify([]));
  };

  if (!user) {
    return (
      <div className="wishlist-page">
        <Header />
        <div className="wishlist-container">
          <div className="wishlist-card">
            <p>Please log in to view your wishlist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wishlist-page">
        <Header />
        <div className="wishlist-container">
          <div className="wishlist-header">
            <h1>My Wishlist</h1>
            <p>Loading your wishlist...</p>
          </div>
          <div className="loading-skeleton">
            {[1, 2, 3].map((i) => (
              <div key={i} className="wishlist-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <Header />
      
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Your saved products for later</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <Heart size={64} className="empty-icon" />
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite products to view them here later.</p>
            <Link to="/shop" className="shop-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {wishlist.length > 1 && (
              <div className="wishlist-actions">
                <button onClick={moveAllToCart} className="move-all-button">
                  <ShoppingBag size={16} />
                  Move All to Cart
                </button>
              </div>
            )}

            <div className="wishlist-grid">
              {wishlist.map((product) => (
                <div key={product._id} className="wishlist-item">
                  <div className="item-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                    <button 
                      onClick={() => removeFromWishlist(product._id)}
                      className="remove-button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="item-content">
                    <h3>{product.name}</h3>
                    <p className="item-description">{product.description}</p>
                    
                    <div className="item-price">
                      <span className="current-price">Rs.{product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">Rs.{product.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="item-actions">
                      <button 
                        onClick={() => addToCartFromWishlist(product)}
                        className="add-to-cart-button"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wishlist-summary">
              <div className="summary-info">
                <h3>Wishlist Summary</h3>
                <div className="summary-row">
                  <span>Total Items:</span>
                  <span>{wishlist.length}</span>
                </div>
                <div className="summary-row">
                  <span>Total Value:</span>
                  <span>Rs.{wishlist.reduce((total, item) => total + item.price, 0)}</span>
                </div>
              </div>
              <div className="summary-actions">
                <button onClick={moveAllToCart} className="move-all-button large">
                  <ShoppingBag size={20} />
                  Move All to Cart
                </button>
                <Link to="/shop" className="continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
