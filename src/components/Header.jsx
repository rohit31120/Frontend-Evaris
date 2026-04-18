import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, X } from 'lucide-react';
import logo from '../assets/images/logo/logo.jpeg';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import '../styles/components/Header.css';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Use cart context
  const { items, getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();
  
  // Use auth context
  const { isAuthenticated, user, logout } = useAuth();

  // Search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Filter products
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    if (onSearchClose) {
      onSearchClose();
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (isSearchOpen && !event.target.closest('.search-dropdown')) {
        handleSearchClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isSearchOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/">
              <img 
                src={logo} 
                alt="EVARIS" 
                className="logo-image"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Right Icons */}
          <div className="header-icons">
            {/* Search */}
            <div className="search-container">
              <button 
                onClick={handleSearchOpen}
                className="icon-button"
              >
                <Search style={{ width: '20px', height: '20px' }} />
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="search-dropdown">
                  <div className="search-input-wrapper">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                    />
                    <button className="search-close-button" onClick={handleSearchClose}>
                      <X style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="search-results">
                      {searchResults.map((product) => (
                        <Link 
                          key={product.id} 
                          to={`/shop`}
                          className="search-result-item"
                          onClick={handleSearchClose}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="search-result-image"
                          />
                          <div className="search-result-info">
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="user-menu-container">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="icon-button"
              >
                <User style={{ width: '20px', height: '20px' }} />
              </button>
              
              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="user-menu-dropdown">
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="user-menu-item">
                        My Profile
                      </Link>
                      <Link to="/orders" className="user-menu-item">
                        My Orders
                      </Link>
                      <Link to="/wishlist" className="user-menu-item">
                        Wishlist
                      </Link>
                      <Link to="/settings" className="user-menu-item">
                        Settings
                      </Link>
                      <button 
                        onClick={logout}
                        className="user-menu-item logout"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="user-menu-item">
                        Login
                      </Link>
                      <Link to="/signup" className="user-menu-item">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="icon-button cart-button">
              <ShoppingCart style={{ width: '20px', height: '20px' }} />
              {cartItemsCount > 0 && (
                <span className="cart-badge">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
