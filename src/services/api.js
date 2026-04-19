const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // For production (Vercel serverless functions)
  : 'http://localhost:5000/api';  // For development

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Products API functions
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    return apiRequest(endpoint);
  },

  getFeatured: async () => {
    return apiRequest('/products/featured');
  },

  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  getByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products/category/${category}?${queryString}` : `/products/category/${category}`;
    return apiRequest(endpoint);
  },

  search: async (query) => {
    return apiRequest(`/products/search?q=${encodeURIComponent(query)}`);
  },

  // Admin functions
  create: async (productData) => {
    // Check if productData is FormData (for file uploads)
    if (productData instanceof FormData) {
      return apiRequest('/admin/products', {
        method: 'POST',
        body: productData,
        headers: {} // Let browser set Content-Type for FormData
      });
    } else {
      // Regular JSON data
      return apiRequest('/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData)
      });
    }
  },

  delete: async (productId) => {
    return apiRequest(`/admin/products/${productId}`, {
      method: 'DELETE'
    });
  },
};

// Contact API functions
export const contactAPI = {
  submit: async (contactData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Orders API functions
export const ordersAPI = {
  create: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getMyOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/orders/my-orders?${queryString}` : '/orders/my-orders';
    return apiRequest(endpoint);
  },

  getById: async (id) => {
    return apiRequest(`/orders/${id}`);
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Admin functions
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/admin/orders?${queryString}` : '/admin/orders';
    return apiRequest(endpoint);
  },

  getByIdAdmin: async (id) => {
    return apiRequest(`/admin/orders/${id}`);
  },

  updateStatusAdmin: async (id, status) => {
    return apiRequest(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Users API functions
export const usersAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  updateProfile: async (userData) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  addAddress: async (addressData) => {
    return apiRequest('/users/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },

  deleteAddress: async (addressId) => {
    return apiRequest(`/users/addresses/${addressId}`, {
      method: 'DELETE',
    });
  },

  // Admin functions
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/admin/users?${queryString}` : '/admin/users';
    return apiRequest(endpoint);
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/admin/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  updateRole: async (id, role) => {
    return apiRequest(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

export default apiRequest;
