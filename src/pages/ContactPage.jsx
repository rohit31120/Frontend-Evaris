import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { contactAPI } from '../services/api';
import '../styles/pages/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await contactAPI.submit(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.95) 0%, rgba(212, 175, 55, 0.95) 50%, rgba(184, 134, 11, 0.95) 100%)',
        padding: '100px 20px',
        textAlign: 'center',
        color: '#1F2937'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(36px, 6vw, 56px)', 
            fontWeight: '700', 
            marginBottom: '24px',
            fontFamily: 'Georgia, serif'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '32px',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            We'd love to hear from you. Reach out to us with any questions, concerns, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '24px' }}>Get in Touch</h2>
              <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              {/* Submission Status Messages */}
              {submitStatus === 'success' && (
                <div style={{
                  backgroundColor: '#D1FAE5',
                  color: '#065F46',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  border: '1px solid #A7F3D0'
                }}>
                  <strong>Success!</strong> Your message has been submitted successfully. We'll get back to you soon!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  border: '1px solid #FECACA'
                }}>
                  <strong>Error!</strong> Failed to submit your message. Please try again later.
                </div>
              )}
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '15px',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B6914'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '15px',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B6914'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '15px',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B6914'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Subject *</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '15px',
                      color: '#374151',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B6914'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Status</option>
                    <option value="return">Return/Refund</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '15px',
                      resize: 'vertical',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B6914'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: isSubmitting ? '#9CA3AF' : '#8B6914',
                    color: 'white',
                    padding: '16px 32px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(139, 105, 20, 0.3)',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#6B4F0F')}
                  onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#8B6914')}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '24px' }}>Contact Information</h2>
              <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '40px', lineHeight: '1.6' }}>
                Reach out to us through any of the following channels:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#FFF9E6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail style={{ width: '24px', height: '24px', color: '#8B6914' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>Email Us</h3>
                    <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '8px' }}>support@evaris.com</p>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
                      We'll respond within 24 hours on business days
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#FFF9E6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone style={{ width: '24px', height: '24px', color: '#8B6914' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>Call Us</h3>
                    <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '8px' }}>+91 98765 43210</p>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
                      Monday - Saturday, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#FFF9E6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin style={{ width: '24px', height: '24px', color: '#8B6914' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>Visit Us</h3>
                    <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', marginBottom: '8px' }}>
                      EVARIS Headquarters<br />
                      123 Beauty Street, Bandra West<br />
                      Mumbai, Maharashtra 400050<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#FFF9E6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock style={{ width: '24px', height: '24px', color: '#8B6914' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>Business Hours</h3>
                    <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed<br />
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>All times are IST (Indian Standard Time)</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div style={{ marginTop: '48px', padding: '32px', backgroundColor: '#FFF9E6', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Quick Links</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#4B5563',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <MessageCircle style={{ width: '16px', height: '16px', color: '#8B6914' }} />
                    Start Live Chat
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#4B5563',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <Mail style={{ width: '16px', height: '16px', color: '#8B6914' }} />
                    Track Your Order
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#4B5563',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <Phone style={{ width: '16px', height: '16px', color: '#8B6914' }} />
                    Schedule a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#F9FAFB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Find quick answers to common questions about our products and services
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>How long does shipping take?</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>Standard shipping takes 5-7 business days within India.</p>
            </div>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>What is your return policy?</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>We offer a 30-day money-back guarantee on all products.</p>
            </div>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Are products cruelty-free?</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>Yes, all our products are 100% cruelty-free and PETA certified.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
