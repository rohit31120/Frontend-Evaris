import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import logo from '../assets/images/logo/logo.jpeg';
import '../styles/components/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles className="hero-badge-icon" />
              <span className="hero-badge-text">Premium Beauty Care</span>
            </div>
            
            <h1 className="hero-title">
              Discover Your
              <span className="hero-title-highlight">Natural Glow</span>
            </h1>
            
            <p className="hero-description">
              Experience luxury skincare with EVARIS. Our scientifically-formulated products combine nature's finest ingredients with cutting-edge technology for radiant, healthy skin.
            </p>

            <div className="hero-buttons">
              <button className="hero-button-primary">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="hero-button-secondary">
                Explore Products
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <div className="trust-number">50K+</div>
                <div className="trust-label">Happy Customers</div>
              </div>
              <div className="trust-item">
                <div className="trust-number">4.9</div>
                <div className="trust-label">Average Rating</div>
              </div>
              <div className="trust-item">
                <div className="trust-number">100%</div>
                <div className="trust-label">Natural Ingredients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="hero-showcase">
            <div className="hero-showcase-content">
              <div className="hero-showcase-card">
                <div className="hero-product-display">
                  <div className="hero-product-content">
                    <img 
                      src={logo} 
                      alt="EVARIS" 
                      className="hero-product-logo"
                    />
                    <p className="hero-product-text">Premium Beauty Products</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hero-decoration-1"></div>
            <div className="hero-decoration-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
