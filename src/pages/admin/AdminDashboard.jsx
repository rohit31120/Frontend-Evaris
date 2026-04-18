import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Users, ShoppingCart, TrendingUp, Plus, Edit, Trash2, LogOut, Eye } from 'lucide-react';
import '../../styles/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email !== 'admin@evaris.com' && user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Fetch admin stats and recent data
    const fetchAdminData = async () => {
      try {
        // Mock data for now - will be replaced with API calls
        setStats({
          totalProducts: 12,
          totalOrders: 156,
          totalUsers: 89,
          totalRevenue: 45678
        });
        
        setRecentProducts([
          { id: 1, name: 'EVARIS SKIN LIGHTENING CREAM', price: 2999, category: 'skincare', stock: 45, status: 'active' },
          { id: 2, name: 'EVARIS BARRIER REPAIR MOISTURIZER', price: 2499, category: 'skincare', stock: 32, status: 'active' },
          { id: 3, name: 'EVARIS VITAMIN C SERUM', price: 3499, category: 'serum', stock: 28, status: 'active' }
        ]);

        setRecentOrders([
          { id: 1, customer: 'John Doe', total: 5998, status: 'delivered', date: '2024-01-15' },
          { id: 2, customer: 'Jane Smith', total: 3499, status: 'processing', date: '2024-01-16' },
          { id: 3, customer: 'Bob Johnson', total: 8997, status: 'pending', date: '2024-01-17' }
        ]);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-logo">EVARIS Admin</h1>
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="admin-content">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin" className="admin-nav-item active">
              <TrendingUp size={20} />
              Dashboard
            </Link>
            <Link to="/admin/products" className="admin-nav-item">
              <Package size={20} />
              Products
            </Link>
            <Link to="/admin/products/add" className="admin-nav-item">
              <Plus size={20} />
              Add Product
            </Link>
            <Link to="/admin/orders" className="admin-nav-item">
              <ShoppingCart size={20} />
              Orders
            </Link>
            <Link to="/admin/users" className="admin-nav-item">
              <Users size={20} />
              Users
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <Package size={24} />
              </div>
              <div className="stat-info">
                <h3>{stats.totalProducts}</h3>
                <p>Total Products</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <ShoppingCart size={24} />
              </div>
              <div className="stat-info">
                <h3>{stats.totalOrders}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-info">
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-info">
                <h3>Rs. {stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="admin-sections">
            {/* Recent Products */}
            <section className="admin-section">
              <div className="section-header">
                <h2>Recent Products</h2>
                <Link to="/admin/products" className="view-all-btn">View All</Link>
              </div>
              <div className="recent-products">
                {recentProducts.map(product => (
                  <div key={product.id} className="recent-product-card">
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>Rs. {product.price.toLocaleString()}</p>
                      <span className={`category-badge ${product.category}`}>{product.category}</span>
                      <span className={`status-badge ${product.status}`}>{product.status}</span>
                      <p className="stock-info">Stock: {product.stock}</p>
                    </div>
                    <div className="product-actions">
                      <button className="action-btn edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Orders */}
            <section className="admin-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <Link to="/admin/orders" className="view-all-btn">View All</Link>
              </div>
              <div className="recent-orders">
                {recentOrders.map(order => (
                  <div key={order.id} className="recent-order-card">
                    <div className="order-info">
                      <h4>Order #{order.id}</h4>
                      <p>Customer: {order.customer}</p>
                      <p>Total: Rs. {order.total.toLocaleString()}</p>
                      <p>Date: {order.date}</p>
                      <span className={`status-badge ${order.status}`}>{order.status}</span>
                    </div>
                    <div className="order-actions">
                      <button className="action-btn view">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="admin-section">
              <div className="section-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="quick-actions">
                <Link to="/admin/products/add" className="quick-action-btn primary">
                  <Plus size={20} />
                  Add New Product
                </Link>
                <Link to="/admin/orders" className="quick-action-btn secondary">
                  <ShoppingCart size={20} />
                  View Orders
                </Link>
                <Link to="/admin/users" className="quick-action-btn secondary">
                  <Users size={20} />
                  Manage Users
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
