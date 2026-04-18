import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/TermsOfServicePage.css';

const TermsOfServicePage = () => {
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
            Terms of Service
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 18px)', 
            marginBottom: '16px',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            Please read these terms carefully before using our website and services.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            
            {/* Agreement to Terms */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Agreement to Terms
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                By accessing and using the EVARIS website ("Website") and our services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                If you do not agree to abide by the above, please do not use this service or access our website.
              </p>
            </div>

            {/* Use License */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Use License
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                Permission is granted to temporarily download one copy of the materials on EVARIS's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Modify or copy the materials</li>
                <li style={{ marginBottom: '8px' }}>Use the materials for any commercial purpose or for any public display</li>
                <li style={{ marginBottom: '8px' }}>Attempt to reverse engineer any software contained on the website</li>
                <li style={{ marginBottom: '8px' }}>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by EVARIS at any time.
              </p>
            </div>

            {/* Products and Services */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Products and Services
              </h2>
              
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Product Information
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We strive to be as accurate as possible in the descriptions of our products. However, we do not warrant that product descriptions, colors, information, or other content of the products are accurate, complete, reliable, current, or error-free.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Product Availability
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                Products are subject to availability. We reserve the right to discontinue any products at any time. We are not liable to you or to any third-party for any modification, price change, suspension, or discontinuance of any product.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Prices and Payment
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                All prices are shown in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated. We reserve the right to change our prices at any time without notice. Payment must be made in full before products are shipped.
              </p>
            </div>

            {/* User Accounts */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                User Accounts
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                You must:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Provide accurate, current, and complete information</li>
                <li style={{ marginBottom: '8px' }}>Maintain and update your information promptly</li>
                <li style={{ marginBottom: '8px' }}>Not share your password with anyone</li>
                <li style={{ marginBottom: '8px' }}>Notify us immediately of any unauthorized use</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.
              </p>
            </div>

            {/* Orders and Payment */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Orders and Payment
              </h2>
              
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Order Acceptance
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                Your receipt of an electronic order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. We reserve the right at any time after receipt of your order to accept or decline your order for any reason.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Payment Terms
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                All payments must be made in Indian Rupees. We accept various payment methods including credit cards, debit cards, UPI, and digital wallets. By providing payment information, you represent that you are authorized to use the payment method.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#8B6914', marginBottom: '12px' }}>
                Risk of Loss
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                All items purchased from EVARIS are made pursuant to a shipment contract. This means that the risk of loss and title for such items pass to you upon our delivery to the shipping carrier.
              </p>
            </div>

            {/* Shipping and Delivery */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Shipping and Delivery
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We ship to addresses within India and select international destinations. Shipping times and costs vary based on your location and selected shipping method.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                Estimated delivery times are not guaranteed. We are not liable for any delays in shipments.
              </p>
            </div>

            {/* Returns and Refunds */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Returns and Refunds
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                We offer a 30-day return policy from the date of delivery. To be eligible for a return:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Products must be unused and in original packaging</li>
                <li style={{ marginBottom: '8px' }}>Return request must be made within 30 days of delivery</li>
                <li style={{ marginBottom: '8px' }}>Proof of purchase is required</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                Refunds will be processed within 5-7 business days after we receive the returned items. Shipping costs are non-refundable.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Intellectual Property
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                All content included on this site, such as text, graphics, logos, images, data compilations, and software, is the property of EVARIS or its content suppliers and protected by international copyright laws.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                The compilation of all content on this site is the exclusive property of EVARIS and protected by international copyright laws.
              </p>
            </div>

            {/* User Conduct */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                User Conduct
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                You agree not to:
              </p>
              <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Use the website for any illegal purpose</li>
                <li style={{ marginBottom: '8px' }}>Attempt to gain unauthorized access to our systems</li>
                <li style={{ marginBottom: '8px' }}>Interfere with or disrupt the website or servers</li>
                <li style={{ marginBottom: '8px' }}>Post or transmit any harmful or inappropriate content</li>
                <li style={{ marginBottom: '8px' }}>Violate any applicable laws or regulations</li>
                <li style={{ marginBottom: '8px' }}>Infringe on the intellectual property rights of others</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Disclaimer
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                The materials on EVARIS's website are provided on an 'as is' basis. EVARIS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                Further, EVARIS does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Limitation of Liability
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                In no event shall EVARIS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EVARIS's website, even if EVARIS or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </div>

            {/* Indemnification */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Indemnification
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                You agree to indemnify and defend EVARIS and its directors, employees, partners, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Governing Law
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Changes to Terms of Service
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                Contact Information
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '16px' }}>
                Questions about the Terms of Service should be sent to us at:
              </p>
              <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '12px', marginTop: '16px' }}>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '8px' }}>
                  <strong>Email:</strong> legal@evaris.com
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

export default TermsOfServicePage;
