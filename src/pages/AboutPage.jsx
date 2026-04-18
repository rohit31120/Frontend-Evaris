import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/AboutPage.css';

const AboutPage = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Scientific Officer",
      expertise: "Dermatology & Cosmetic Chemistry",
      description: "Leading our research team with 15+ years of experience in dermatology and cosmetic formulation."
    },
    {
      name: "Michael Chen",
      role: "CEO & Founder",
      expertise: "Business Strategy & Innovation",
      description: "Visionary leader committed to revolutionizing the skincare industry through science-backed solutions."
    },
    {
      name: "Dr. Lisa Park",
      role: "Head of R&D",
      expertise: "Biochemistry & Natural Ingredients",
      description: "Expert in natural ingredient research and sustainable formulation techniques."
    },
    {
      name: "Emma Williams",
      role: "Customer Experience Director",
      expertise: "Beauty Consulting & Education",
      description: "Dedicated to ensuring every customer receives personalized skincare guidance."
    }
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About EVARIS</h1>
          <p className="about-hero-description">
            Discover our story of passion, science, and commitment to bringing you the finest in luxury skincare
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story-section">
        <div className="our-story-container">
          <div className="our-story-header">
            <h2>Our Story</h2>
            <p>
              Founded in 2014, EVARIS began with a simple mission: to create skincare products that deliver visible results without compromising on safety or sustainability. What started as a small laboratory has grown into a global brand trusted by over 50,000 customers worldwide.
            </p>
          </div>
          
          <div className="our-story-grid">
            <div className="our-story-card">
              <h3>Our Mission</h3>
              <p>
                To empower individuals with premium skincare solutions that combine scientific innovation with nature's finest ingredients, helping everyone achieve their most radiant, healthy skin.
              </p>
            </div>
            
            <div className="our-story-card">
              <h3>Our Vision</h3>
              <p>
                To become the global leader in luxury skincare, setting new standards for efficacy, safety, and sustainability in the beauty industry.
              </p>
            </div>
            
            <div className="our-story-card">
              <h3>Our Values</h3>
              <p>
                Innovation, quality, transparency, and sustainability guide everything we do, from ingredient sourcing to product formulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics-section">
        <div className="statistics-container">
          <h2>Our Impact</h2>
          <div className="statistics-grid">
            <div className="statistic-item">
              <h3>100%</h3>
              <p>Natural Ingredients</p>
            </div>
            <div className="statistic-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="statistic-item">
              <h3>4.9</h3>
              <p>Average Rating</p>
            </div>
            <div className="statistic-item">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
            <div className="statistic-item">
              <h3>25+</h3>
              <p>Award-Winning Products</p>
            </div>
            <div className="statistic-item">
              <h3>0%</h3>
              <p>Animal Testing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2>Meet Our Team</h2>
            <p>
              The brilliant minds behind EVARIS, dedicated to bringing you the best in skincare innovation
            </p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="team-member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-expertise">{member.expertise}</p>
                <p className="team-member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="commitments-section">
        <div className="commitments-container">
          <h2>Our Commitment</h2>
          <div className="commitments-grid">
            <div className="commitment-card">
              <h3>Cruelty-Free</h3>
              <p>
                We never test on animals and are proudly certified cruelty-free by PETA.
              </p>
            </div>
            
            <div className="commitment-card">
              <h3>Sustainable Sourcing</h3>
              <p>
                All ingredients are ethically sourced from sustainable suppliers worldwide.
              </p>
            </div>
            
            <div className="commitment-card">
              <h3>Eco-Friendly Packaging</h3>
              <p>
                Our packaging is recyclable and made from sustainable materials.
              </p>
            </div>
            
            <div className="commitment-card">
              <h3>Scientific Backing</h3>
              <p>
                Every formula is clinically tested and proven effective by dermatologists.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
