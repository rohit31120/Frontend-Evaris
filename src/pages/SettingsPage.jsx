import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Bell, Shield, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import '../styles/pages/SettingsPage.css';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    promotions: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false
  });

  if (!user) {
    return (
      <div className="settings-page">
        <Header />
        <div className="settings-container">
          <div className="settings-card">
            <p>Please log in to view your settings.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="settings-page">
      <Header />
      
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and privacy</p>
        </div>

        <div className="settings-layout">
          {/* Settings Navigation */}
          <div className="settings-nav">
            <button
              className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <Shield size={20} />
              Account
            </button>
            <button
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={20} />
              Notifications
            </button>
            <button
              className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <Shield size={20} />
              Privacy
            </button>
            <button
              className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <CreditCard size={20} />
              Payment
            </button>
            <button
              className={`nav-item ${activeTab === 'help' ? 'active' : ''}`}
              onClick={() => setActiveTab('help')}
            >
              <HelpCircle size={20} />
              Help & Support
            </button>
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {activeTab === 'account' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <div className="setting-group">
                  <h3>Basic Information</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Full Name</h4>
                      <p>{user.name}</p>
                    </div>
                    <button className="setting-action">Edit</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Address</h4>
                      <p>{user.email}</p>
                    </div>
                    <button className="setting-action">Change</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Phone Number</h4>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                    <button className="setting-action">Add</button>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>Security</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Password</h4>
                      <p>Last changed 30 days ago</p>
                    </div>
                    <button className="setting-action">Change</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security</p>
                    </div>
                    <button className="setting-action">Enable</button>
                  </div>
                </div>

                <div className="setting-group danger">
                  <h3>Danger Zone</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button className="setting-action danger">Delete</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>
                <div className="setting-group">
                  <h3>Email Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Order Updates</h4>
                      <p>Get notified about your order status</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Promotional Emails</h4>
                      <p>Receive special offers and discounts</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={() => handleNotificationChange('promotions')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>Push Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Mobile Notifications</h4>
                      <p>Get updates on your mobile device</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h2>Privacy Settings</h2>
                <div className="setting-group">
                  <h3>Profile Visibility</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Profile Visibility</h4>
                      <p>Control who can see your profile</p>
                    </div>
                    <select 
                      className="setting-select"
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Show Email</h4>
                      <p>Display email on public profile</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.showEmail}
                        onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Show Phone</h4>
                      <p>Display phone number on public profile</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.showPhone}
                        onChange={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>Data & Privacy</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Download Your Data</h4>
                      <p>Get a copy of all your data</p>
                    </div>
                    <button className="setting-action">Download</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Privacy Policy</h4>
                      <p>Read our privacy policy</p>
                    </div>
                    <Link to="/privacy-policy" className="setting-action">View</Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="settings-section">
                <h2>Payment Settings</h2>
                <div className="setting-group">
                  <h3>Payment Methods</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Credit Cards</h4>
                      <p>No cards saved</p>
                    </div>
                    <button className="setting-action">Add Card</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>UPI</h4>
                      <p>Manage UPI payment options</p>
                    </div>
                    <button className="setting-action">Manage</button>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>Billing Address</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Default Billing Address</h4>
                      <p>No billing address set</p>
                    </div>
                    <button className="setting-action">Add Address</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="settings-section">
                <h2>Help & Support</h2>
                <div className="setting-group">
                  <h3>Support</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Contact Support</h4>
                      <p>Get help with your account</p>
                    </div>
                    <Link to="/contact" className="setting-action">Contact</Link>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>FAQ</h4>
                      <p>Frequently asked questions</p>
                    </div>
                    <Link to="/faq" className="setting-action">View FAQ</Link>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Terms of Service</h4>
                      <p>Read our terms and conditions</p>
                    </div>
                    <Link to="/terms-of-service" className="setting-action">View Terms</Link>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>About</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>App Version</h4>
                      <p>Version 1.0.0</p>
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Account Type</h4>
                      <p>{user.role === 'admin' ? 'Administrator' : 'Regular User'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;
