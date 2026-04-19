import { useState, useEffect } from 'react';
import { usersAPI } from '../../services/api';
import '../../styles/pages/AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersAPI.getAll({ page: 1, limit: 10 });
        if (response.success) {
          setUsers(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role) => {
    return role === 'admin' ? <Shield size={16} /> : <User size={16} />;
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? '#dc2626' : '#3b82f6';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#10b981' : '#6b7280';
  };

  if (loading) {
    return (
      <div className="admin-users-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div className="header-left">
          <Link to="/admin" className="back-btn">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>All Users</h1>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <Filter size={20} />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
        
        <div className="users-count">
          <span>{filteredUsers.length} users found</span>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <h3>No users found</h3>
          <p>
            {searchTerm || filterRole !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'No users available yet.'}
          </p>
        </div>
      ) : (
        <div className="users-table">
          <div className="table-header">
            <div className="header-cell">User</div>
            <div className="header-cell">Contact</div>
            <div className="header-cell">Role</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Registered</div>
            <div className="header-cell">Orders</div>
            <div className="header-cell">Total Spent</div>
          </div>
          
          {filteredUsers.map(user => (
            <div key={user.id} className="user-row">
              <div className="user-cell">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <span className="user-id">ID: #{user.id.toString().padStart(6, '0')}</span>
                  </div>
                </div>
              </div>
              
              <div className="user-cell">
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={14} />
                    <span>{user.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="user-cell">
                <div 
                  className="role-badge"
                  style={{ backgroundColor: getRoleColor(user.role) }}
                >
                  {getRoleIcon(user.role)}
                  <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </div>
              </div>
              
              <div className="user-cell">
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(user.status) }}
                >
                  <span>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                </div>
              </div>
              
              <div className="user-cell">
                <div className="date-info">
                  <div className="registered-date">
                    <Calendar size={14} />
                    <span>{new Date(user.registeredAt).toLocaleDateString()}</span>
                  </div>
                  <div className="last-login">
                    Last: {new Date(user.lastLogin).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="user-cell">
                <span className="order-count">{user.totalOrders}</span>
              </div>
              
              <div className="user-cell">
                <span className="total-spent">Rs. {user.totalSpent.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
