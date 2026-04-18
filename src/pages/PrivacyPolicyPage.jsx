import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  const lastUpdated = "April 16, 2024";

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.95) 0%, rgba(212, 175, 55, 0.95) 50%, rgba(184, 134, 11, 0.95) 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        color: '#1F2937'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(36px, 6vw, 48px)', 
            fontWeight: '700', 
            marginBottom: '24px',
            fontFamily: 'Georgia, serif'
          }}>
            Privacy Policy
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 18px)', 
            marginBottom: '16px',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            
            {/* Introduction */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Introduction
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                EVARIS ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website evaris.com and use our services.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                By using our website and services, you consent to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Information We Collect
              </h2>
              
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Personal Information
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '20px' }}>
                When you create an account, make a purchase, or contact us, we may collect:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Name and contact information (email, phone, address)</li>
                <li style={{ marginBottom: '8px' }}>Payment information (processed securely by third-party payment processors)</li>
                <li style={{ marginBottom: '8px' }}>Account credentials and preferences</li>
                <li style={{ marginBottom: '8px' }}>Skincare preferences and skin type information</li>
                <li style={{ marginBottom: '8px' }}>Communication history with our customer service</li>
              </ul>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Automatically Collected Information
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '20px' }}>
                We automatically collect certain information when you visit our website:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '20px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>IP address and browser information</li>
                <li style={{ marginBottom: '8px' }}>Device information and operating system</li>
                <li style={{ marginBottom: '8px' }}>Pages visited and time spent on our site</li>
                <li style={{ marginBottom: '8px' }}>Referring website and search terms</li>
                <li style={{ marginBottom: '8px' }}>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                How We Use Your Information
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We use your information for the following purposes:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>To process and fulfill your orders</li>
                <li style={{ marginBottom: '8px' }}>To provide customer service and support</li>
                <li style={{ marginBottom: '8px' }}>To personalize your experience and recommend products</li>
                <li style={{ marginBottom: '8px' }}>To send marketing communications (with your consent)</li>
                <li style={{ marginBottom: '8px' }}>To improve our website and services</li>
                <li style={{ marginBottom: '8px' }}>To detect and prevent fraud or abuse</li>
                <li style={{ marginBottom: '8px' }}>To comply with legal obligations</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Information Sharing
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>With third-party service providers (payment processors, shipping companies)</li>
                <li style={{ marginBottom: '8px' }}>With business partners for joint marketing (with your consent)</li>
                <li style={{ marginBottom: '8px' }}>When required by law or to protect our rights</li>
                <li style={{ marginBottom: '8px' }}>In connection with a business merger or acquisition</li>
              </ul>
            </div>

            {/* Cookies and Tracking */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Cookies and Tracking Technologies
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We use cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Essential cookies for website functionality</li>
                <li style={{ marginBottom: '8px' }}>Performance cookies to analyze website usage</li>
                <li style={{ marginBottom: '8px' }}>Marketing cookies to personalize content and ads</li>
                <li style={{ marginBottom: '8px' }}>Social media cookies for sharing functionality</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Data Security
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We implement appropriate security measures to protect your information:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>SSL encryption for data transmission</li>
                <li style={{ marginBottom: '8px' }}>Secure servers for data storage</li>
                <li style={{ marginBottom: '8px' }}>Regular security audits and updates</li>
                <li style={{ marginBottom: '8px' }}>Employee training on data protection</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Your Privacy Rights
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                You have the following rights regarding your personal information:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Access to your personal information</li>
                <li style={{ marginBottom: '8px' }}>Correction of inaccurate information</li>
                <li style={{ marginBottom: '8px' }}>Deletion of your personal information</li>
                <li style={{ marginBottom: '8px' }}>Opt-out of marketing communications</li>
                <li style={{ marginBottom: '8px' }}>Data portability</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                To exercise these rights, contact us at privacy@evaris.com.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Children's Privacy
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                International Data Transfers
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Changes to This Policy
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Contact Us
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '12px', marginTop: '16px' }}>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '8px' }}>
                  <strong>Email:</strong> privacy@evaris.com
                </p>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '8px' }}>
                  <strong>Phone:</strong> +91 (555) 123-4567
                </p>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '8px' }}>
                  <strong>Address:</strong> 123 Beauty Street, Mumbai, Maharashtra 400001, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
