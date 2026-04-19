import { useState, useEffect } from 'react';
import { ordersAPI } from '../../services/api';
import '../../styles/pages/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getAll({ page: 1, limit: 10 });
        if (response.success) {
          setOrders(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    // Navigate to order details page (to be implemented)
    console.log('View order details:', orderId);
    alert('Order details functionality will be implemented soon!');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Package size={16} />;
      case 'processing':
        return <Truck size={16} />;
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <ShoppingCart size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      case 'delivered':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="admin-orders-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-header">
        <div className="header-left">
          <Link to="/admin" className="back-btn">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>All Orders</h1>
        </div>
      </div>

      <div className="orders-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search orders by customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <Filter size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="orders-count">
          <span>{filteredOrders.length} orders found</span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <ShoppingCart size={48} />
          <h3>No orders found</h3>
          <p>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'No orders available yet.'}
          </p>
        </div>
      ) : (
        <div className="orders-table">
          <div className="table-header">
            <div className="header-cell">Order ID</div>
            <div className="header-cell">Customer</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Total</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Actions</div>
          </div>
          
          {filteredOrders.map(order => (
            <div key={order.id} className="order-row">
              <div className="order-cell">
                <span className="order-id">#{order.id.toString().padStart(6, '0')}</span>
              </div>
              
              <div className="order-cell">
                <div className="customer-info">
                  <span className="customer-name">{order.customer}</span>
                  <span className="customer-email">{order.email}</span>
                </div>
              </div>
              
              <div className="order-cell">
                <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              
              <div className="order-cell">
                <span className="order-total">Rs. {order.total.toLocaleString()}</span>
              </div>
              
              <div className="order-cell">
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusIcon(order.status)}
                  <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                </div>
              </div>
              
              <div className="order-cell">
                <button 
                  className="action-btn view"
                  onClick={() => handleViewOrder(order.id)}
                >
                  <Eye size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
