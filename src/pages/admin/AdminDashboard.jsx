import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Users, ShoppingCart, TrendingUp, Plus, Edit, Trash2, LogOut, Eye, Check } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { products as staticProducts } from '../../data/products';
import p1 from '../../assets/images/products/p-1.jpeg';
import p2 from '../../assets/images/products/p-2.jpeg';
import p3 from '../../assets/images/products/p-3.jpeg';
import p4 from '../../assets/images/products/p-4.jpeg';
import p5 from '../../assets/images/products/p-5.jpeg';
import p6 from '../../assets/images/products/p-6.jpeg';
import p7 from '../../assets/images/products/p-7.jpeg';
import p8 from '../../assets/images/products/p-8.jpeg';
import p9 from '../../assets/images/products/p-9.jpeg';
import p10 from '../../assets/images/products/p-10.jpeg';
import '../../styles/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  // Function to map database products to proper image paths
  const mapProductImages = (dbProducts) => {
    return dbProducts.map(product => {
      // If product has an uploaded image (starts with /uploads/), use it directly
      if (product.image && product.image.startsWith('/uploads/')) {
        return {
          ...product,
          image: `http://localhost:5000${product.image}`
        };
      }
      
      // If product has a valid image path that's not the default, try to use it
      if (product.image && !product.image.includes('default.jpg')) {
        return {
          ...product,
          image: product.image
        };
      }
      
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
        // Fetch real products from database
        const { productsAPI } = await import("../../services/api");
        const productsResponse = await productsAPI.getAll({ limit: 5 });
        
        if (productsResponse.success) {
          const products = productsResponse.data;
          const mappedProducts = mapProductImages(products);
          setRecentProducts(mappedProducts.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock,
            status: product.is_active ? 'active' : 'inactive',
            image: product.image
          })));
        }

        // Calculate stats from real data
        const allProductsResponse = await productsAPI.getAll();
        const totalProducts = allProductsResponse.success ? allProductsResponse.data.length : 0;
        
        setStats({
          totalProducts,
          totalOrders: 156, // Mock data for now
          totalUsers: 89, // Mock data for now
          totalRevenue: 45678 // Mock data for now
        });

        // Mock orders for now
        setRecentOrders([
          { id: 1, customer: 'John Doe', total: 5998, status: 'delivered', date: '2024-01-15' },
          { id: 2, customer: 'Jane Smith', total: 3499, status: 'processing', date: '2024-01-16' },
          { id: 3, customer: 'Bob Johnson', total: 8997, status: 'pending', date: '2024-01-17' }
        ]);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Fallback to mock data if API fails - use imported image files
        setRecentProducts([
          { id: 1, name: 'EVARIS SKIN LIGHTENING CREAM', price: 2999, category: 'skincare', stock: 45, status: 'active', image: p1 },
          { id: 2, name: 'EVARIS BARRIER REPAIR MOISTURIZER', price: 2499, category: 'skincare', stock: 32, status: 'active', image: p2 },
          { id: 3, name: 'EVARIS VITAMIN C SERUM', price: 3499, category: 'serum', stock: 28, status: 'active', image: p4 }
        ]);
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

  const handleEditProduct = (productId) => {
    // Navigate to edit product page (to be implemented)
    console.log('Edit product:', productId);
    alert('Edit product functionality will be implemented soon!');
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        console.log('Deleting product:', productId);
        
        // Check if user is authenticated
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('You must be logged in to delete products');
        }
        
        const response = await productsAPI.delete(productId);
        
        if (response.success) {
          alert('Product deleted successfully!');
          // Refresh the products list by calling the fetch function
          const { productsAPI } = await import('../../services/api');
          const productsResponse = await productsAPI.getAll({ limit: 5 });
          
          if (productsResponse.success) {
            const products = productsResponse.data;
            setRecentProducts(products.map(product => ({
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
              stock: product.stock,
              status: product.is_active ? 'active' : 'inactive'
            })));
            
            // Update stats
            const allProductsResponse = await productsAPI.getAll();
            const totalProducts = allProductsResponse.success ? allProductsResponse.data.length : 0;
            setStats(prev => ({ ...prev, totalProducts }));
          }
        } else {
          throw new Error(response.message || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product: ' + error.message);
      }
    }
  };

  const handleViewOrder = (orderId) => {
    // Navigate to order details page (to be implemented)
    console.log('View order:', orderId);
    alert('Order details functionality will be implemented soon!');
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
                    <div className="product-image">
                      <img 
                        src={product.image || p1} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = p1;
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>Rs. {product.price.toLocaleString()}</p>
                      <span className={`category-badge ${product.category}`}>{product.category}</span>
                      <span className={`status-badge ${product.status}`}>{product.status}</span>
                      <p className="stock-info">Stock: {product.stock}</p>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="action-btn edit"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
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
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewOrder(order.id)}
                      >
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
                <Link to="/admin/test" className="quick-action-btn test">
                  <Check size={20} />
                  Test All Options
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
