import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/BlogPage.css';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Glowing Skin",
      excerpt: "Discover the secrets to achieving radiant, healthy skin with our comprehensive guide to skincare routines and ingredients.",
      date: "March 15, 2024",
      author: "Dr. Sarah Johnson",
      category: "Skincare Tips",
      image: products[0]?.image
    },
    {
      id: 2,
      title: "Understanding Vitamin C in Skincare",
      excerpt: "Learn how Vitamin C can transform your skin and why it's a must-have ingredient in your daily routine.",
      date: "March 10, 2024",
      author: "Dr. Michael Chen",
      category: "Ingredient Spotlight",
      image: products[1]?.image
    },
    {
      id: 3,
      title: "Summer Skincare Essentials",
      excerpt: "Protect and nourish your skin during the summer months with these essential tips and product recommendations.",
      date: "March 5, 2024",
      author: "Emma Williams",
      category: "Seasonal Care",
      image: products[2]?.image
    },
    {
      id: 4,
      title: "The Science Behind Hyaluronic Acid",
      excerpt: "Explore the benefits of hyaluronic acid and how it helps maintain skin hydration and elasticity.",
      date: "February 28, 2024",
      author: "Dr. Lisa Park",
      category: "Ingredient Spotlight",
      image: products[3]?.image
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <Header />
      
      <section style={{ padding: '40px 20px', backgroundColor: 'white', borderRadius: '12px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1F2937', marginBottom: '20px' }}>EVARIS Blog</h1>
            <p style={{ fontSize: '18px', color: '#6B7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Expert tips, skincare advice, and the latest insights from our team of beauty professionals
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {blogPosts.map((post) => (
              <article key={post.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s',
                border: '1px solid #F3F4F6'
              }}>
                <div style={{ aspectRatio: '16/9', backgroundColor: '#F9FAFB', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                
                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      backgroundColor: '#FFF9E6',
                      color: '#8B6914',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '16px',
                    lineHeight: '1.6'
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#9CA3AF' }}>
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </div>
                  
                  <button style={{
                    marginTop: '16px',
                    backgroundColor: 'transparent',
                    color: '#8B6914',
                    border: '1px solid #8B6914',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}>
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;
