import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, ArrowLeft, Search, Filter } from 'lucide-react';
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
import '../../styles/pages/AdminProducts.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        if (response.success) {
          const mappedProducts = mapProductImages(response.data || []);
          setProducts(mappedProducts);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const response = await productsAPI.delete(productId);
        
        if (response.success) {
          alert('Product deleted successfully!');
          // Refresh the products list
          const productsResponse = await productsAPI.getAll();
          if (productsResponse.success) {
            setProducts(productsResponse.data || []);
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-products-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      <div className="admin-products-header">
        <div className="header-left">
          <Link to="/admin" className="back-btn">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>All Products</h1>
        </div>
        <Link to="/admin/products/add" className="add-product-btn">
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className="products-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <Filter size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="products-count">
          <span>{filteredProducts.length} products found</span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <Package size={48} />
          <h3>No products found</h3>
          <p>
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'No products available. Add your first product to get started.'}
          </p>
          <Link to="/admin/products/add" className="add-first-product-btn">
            <Plus size={20} />
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.image || '/assets/images/products/default.jpg'} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/assets/images/products/default.jpg';
                  }}
                />
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-meta">
                  <span className="category-badge">{product.category}</span>
                  <span className="price">Rs. {product.price}</span>
                </div>
                
                <div className="product-stock">
                  <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
              
              <div className="product-actions">
                <button className="action-btn edit">
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
