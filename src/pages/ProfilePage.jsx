import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await usersAPI.updateProfile(formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (addressData) => {
    try {
      await usersAPI.addAddress(addressData);
      setMessage('Address added successfully!');
    } catch (error) {
      setMessage('Failed to add address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await usersAPI.deleteAddress(addressId);
      setMessage('Address deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete address');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="profile-page">
        <Header />
        <div className="profile-container">
          <div className="profile-card">
            <p>Please log in to view your profile.</p>
            <Link to="/login" className="shop-button" style={{ marginTop: '16px', display: 'inline-block' }}>
              Go to Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-container">
        <div className="profile-wrapper">
          <div className="profile-header">
            <h1>My Profile</h1>
            <p>Manage your personal information and preferences</p>
          </div>

          {message && (
            <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {/* Personal Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="edit-button"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group"></div>
                </div>
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <span className="label">Full Name:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email Address:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone Number:</span>
                  <span className="value">{user.phone || 'Not provided'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Account Statistics */}
          <div className="profile-section">
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">12</div>
                <div className="stat-label">Orders Placed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8</div>
                <div className="stat-label">Products Reviewed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Wishlist Items</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2024</div>
                <div className="stat-label">Member Since</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="profile-section">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/orders" className="action-card">
                <h3>My Orders</h3>
                <p>View your order history and track shipments</p>
              </Link>
              <Link to="/wishlist" className="action-card">
                <h3>Wishlist</h3>
                <p>Manage your saved products</p>
              </Link>
              <Link to="/settings" className="action-card">
                <h3>Settings</h3>
                <p>Manage account preferences and notifications</p>
              </Link>
              <button onClick={logout} className="action-card logout">
                <h3>Logout</h3>
                <p>Sign out of your account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
