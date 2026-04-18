import { productsAPI } from '../services/api';
import { products as localProducts } from './products';

// Fetch products from backend
export const fetchProducts = async (params = {}) => {
  try {
    const response = await productsAPI.getAll(params);
    const backendProducts = response.data;
    
    // Map backend products to local images
    const productsWithImages = backendProducts.map((product, index) => {
      // Find corresponding local product by ID or use index
      const localProduct = localProducts.find(lp => lp.id === product.id) || localProducts[index % localProducts.length];
      
      return {
        ...product,
        image: localProduct?.image || localProducts[0].image,
        price: parseFloat(product.price) || localProduct?.price || 2999,
        originalPrice: product.original_price ? parseFloat(product.original_price) : localProduct?.originalPrice
      };
    });
    
    return productsWithImages;
  } catch (error) {
    console.error('Error fetching products:', error);
    return localProducts.slice(0, params.limit || 10);
  }
};

// Fetch featured products from backend
export const fetchFeaturedProducts = async () => {
  try {
    const response = await productsAPI.getFeatured();
    const backendProducts = response.data;
    
    // Map backend products to local images
    const productsWithImages = backendProducts.map((product, index) => {
      const localProduct = localProducts.find(lp => lp.id === product.id) || localProducts[index % localProducts.length];
      
      return {
        ...product,
        image: localProduct?.image || localProducts[0].image,
        price: parseFloat(product.price) || localProduct?.price || 2999,
        originalPrice: product.original_price ? parseFloat(product.original_price) : localProduct?.originalPrice
      };
    });
    
    return productsWithImages;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return localProducts.filter(p => p.badge === 'Best Seller' || p.badge === 'Popular').slice(0, 8);
  }
};

// Search products from backend
export const searchProducts = async (query) => {
  try {
    const response = await productsAPI.search(query);
    const backendProducts = response.data;
    
    // Map backend products to local images
    const productsWithImages = backendProducts.map((product, index) => {
      const localProduct = localProducts.find(lp => lp.id === product.id) || localProducts[index % localProducts.length];
      
      return {
        ...product,
        image: localProduct?.image || localProducts[0].image,
        price: parseFloat(product.price) || localProduct?.price || 2999,
        originalPrice: product.original_price ? parseFloat(product.original_price) : localProduct?.originalPrice
      };
    });
    
    return productsWithImages;
  } catch (error) {
    console.error('Error searching products:', error);
    return localProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Get product by ID from backend
export const getProductById = async (id) => {
  try {
    const response = await productsAPI.getById(id);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

// Get products by category from backend
export const getProductsByCategory = async (category, params = {}) => {
  try {
    const response = await productsAPI.getByCategory(category, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};
