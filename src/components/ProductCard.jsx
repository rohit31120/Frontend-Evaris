import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/components/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getColorClasses = (color) => {
    const colors = {
      yellow: 'yellow',
      purple: 'purple',
      green: 'green',
      blue: 'blue'
    };
    return colors[color] || 'default';
  };

  const getBadgeColor = (color) => {
    const colors = {
      yellow: 'yellow',
      purple: 'purple',
      green: 'green',
      blue: 'blue'
    };
    return colors[color] || 'default';
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />

        {/* Badge */}
        {product.badge && (
          <div className={`product-card-badge ${getBadgeColor(product.color)}`}>
            {product.badge}
          </div>
        )}

        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="product-card-quick-add"
        >
          <ShoppingCart className="product-card-quick-add-icon" />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-card-content">
        <h3 className="product-card-title">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-card-rating">
          <div className="product-card-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`product-card-star ${i < 4 ? 'filled' : 'empty'}`}
              />
            ))}
          </div>
          <span className="product-card-rating-text">(4.5)</span>
        </div>

        {/* Description */}
        <p className="product-card-description">{product.description}</p>

        {/* Price */}
        <div className="product-card-price">
          <span className="product-card-current-price">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="product-card-original-price">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Key Ingredients */}
        <div className="product-card-ingredients">
          {product.keyIngredients.slice(0, 2).map((ingredient, index) => (
            <span
              key={index}
              className="product-card-ingredient"
            >
              {ingredient.name}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className={`product-card-add-to-cart ${getColorClasses(product.color)}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
