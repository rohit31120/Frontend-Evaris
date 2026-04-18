import React from 'react';
import ProductCard from './ProductCard';
import '../styles/components/ProductList.css';

const ProductList = ({ products, title }) => {
  return (
    <section className="product-list">
      <div className="product-list-container">
        <h2 className="product-list-title">
          {title}
        </h2>
        
        <div className="product-list-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="product-list-empty">
            <p className="product-list-empty-text">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
