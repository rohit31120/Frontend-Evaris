import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/pages/FAQPage.css';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      category: "Product Information",
      questions: [
        {
          question: "Are EVARIS products suitable for all skin types?",
          answer: "Yes, our products are formulated to be suitable for all skin types including sensitive, dry, oily, and combination skin. However, we always recommend patch testing new products on a small area of skin before full application."
        },
        {
          question: "How long does it take to see results?",
          answer: "Results vary by individual and product, but most customers notice visible improvements within 4-6 weeks of consistent use. For best results, follow the recommended usage instructions and maintain a consistent skincare routine."
        },
        {
          question: "Are your products organic?",
          answer: "While not all ingredients are certified organic, we prioritize natural and ethically sourced ingredients. All our formulas are free from harmful chemicals like parabens, sulfates, and phthalates."
        },
        {
          question: "What is the shelf life of your products?",
          answer: "Our products typically have a shelf life of 24-36 months when unopened. Once opened, we recommend using within 12 months for best efficacy. Check the product packaging for specific expiration dates."
        }
      ]
    },
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping typically takes 5-7 business days within India. Express shipping options are available for 2-3 business day delivery. International shipping times vary by destination."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. You can check if we ship to your country during checkout."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
        },
        {
          question: "What if my order arrives damaged?",
          answer: "Please contact our customer service within 48 hours of receiving your order with photos of the damage. We'll arrange for a replacement or refund immediately."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day money-back guarantee on all products. If you're not satisfied with your purchase, you can return it within 30 days for a full refund, minus shipping costs."
        },
        {
          question: "How do I initiate a return?",
          answer: "Contact our customer service team at support@evaris.com with your order number. We'll provide you with a return shipping label and instructions."
        },
        {
          question: "Are there any items that cannot be returned?",
          answer: "Opened products used for more than 14 days, gift cards, and promotional items cannot be returned. However, if you have a reaction to a product, please contact us immediately."
        },
        {
          question: "How long do refunds take to process?",
          answer: "Refunds are typically processed within 5-7 business days after we receive your returned items. The funds will be credited back to your original payment method."
        }
      ]
    },
    {
      category: "Payment & Security",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, net banking, and digital wallets like PayPal and Paytm."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we offer EMI options on orders above a certain amount through select credit card providers. Details are available at checkout."
        },
        {
          question: "Can I change my payment method after placing an order?",
          answer: "Payment method changes are not possible once an order is placed. However, you can cancel your current order and place a new one with your preferred payment method."
        }
      ]
    },
    {
      category: "Ingredients & Safety",
      questions: [
        {
          question: "Are your products cruelty-free?",
          answer: "Absolutely! We are proud to be 100% cruelty-free and PETA certified. We never test our products or ingredients on animals."
        },
        {
          question: "Are your products vegan?",
          answer: "Most of our products are vegan. Any products containing honey, beeswax, or other animal-derived ingredients are clearly labeled."
        },
        {
          question: "Do your products contain fragrance?",
          answer: "We use natural essential oils for fragrance and avoid synthetic fragrances. All our products are formulated to be gentle on sensitive skin."
        },
        {
          question: "Are your products safe during pregnancy?",
          answer: "While our products use gentle, natural ingredients, we recommend consulting with your healthcare provider before using any skincare products during pregnancy or while breastfeeding."
        }
      ]
    },
    {
      category: "Account & Membership",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and access exclusive member benefits."
        },
        {
          question: "What are the benefits of creating an account?",
          answer: "Account members get early access to new products, exclusive discounts, reward points on purchases, and personalized skincare recommendations."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link within minutes."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address in your account settings or contact customer service for assistance."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
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
            Frequently Asked Questions
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '32px',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            Find answers to common questions about our products, orders, and services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} style={{ marginBottom: '60px' }}>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '32px',
                borderBottom: '2px solid #F4D03F',
                paddingBottom: '12px'
              }}>
                {category.category}
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {category.questions.map((faq, questionIndex) => {
                  const isActive = activeIndex === `${categoryIndex}-${questionIndex}`;
                  
                  return (
                    <div 
                      key={questionIndex}
                      style={{
                        backgroundColor: '#FAFAFA',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        style={{
                          width: '100%',
                          padding: '20px 24px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#1F2937',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <span style={{ flex: 1 }}>{faq.question}</span>
                        {isActive ? (
                          <ChevronUp style={{ width: '20px', height: '20px', color: '#8B6914' }} />
                        ) : (
                          <ChevronDown style={{ width: '20px', height: '20px', color: '#8B6914' }} />
                        )}
                      </button>
                      
                      {isActive && (
                        <div style={{
                          padding: '0 24px 20px',
                          borderTop: '1px solid #E5E7EB',
                          backgroundColor: 'white'
                        }}>
                          <p style={{
                            fontSize: '15px',
                            color: '#4B5563',
                            lineHeight: '1.6',
                            margin: '16px 0 0 0'
                          }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section style={{ padding: '60px 20px', backgroundColor: '#FFF9E6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '20px' }}>
            Still Have Questions?
          </h2>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>
            Can't find the answer you're looking for? Our customer service team is here to help!
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: '#8B6914',
              color: 'white',
              padding: '14px 28px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              Contact Support
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#8B6914',
              padding: '14px 28px',
              border: '2px solid #8B6914',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              Live Chat
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
