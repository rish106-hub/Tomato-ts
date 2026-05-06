import React from 'react';
import './Privacy.css';

const Privacy: React.FC = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <div className="privacy-content">
          <section className="privacy-section">
            <h2>Information We Collect</h2>
            <p>
              When you use Crave, we collect certain information to provide you the fastest,
              most reliable food delivery experience across Delhi NCR:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email, phone number, delivery address</li>
              <li><strong>Order Information:</strong> Food preferences, order history, payment details</li>
              <li><strong>Technical Information:</strong> IP address, device information, browsing behaviour</li>
              <li><strong>Location Data:</strong> GPS coordinates for real-time delivery tracking (with your consent)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li><strong>Process and deliver your orders</strong> — across Delhi NCR within 30 minutes</li>
              <li><strong>Provide customer support</strong> — 7 days a week</li>
              <li><strong>Improve our platform</strong> — personalised recommendations, faster reorders</li>
              <li><strong>Ensure platform security</strong> — protect your account and payment details</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your personal information
              in compliance with Indian IT Act, 2000 and SPDI Rules, 2011:
            </p>
            <ul>
              <li><strong>SSL Encryption:</strong> All data transmissions are fully encrypted</li>
              <li><strong>Secure Payment Processing:</strong> PCI-DSS compliant payment gateway</li>
              <li><strong>Regular Security Audits:</strong> Continuous vulnerability monitoring</li>
              <li><strong>Minimal Data Access:</strong> Only authorised personnel handle personal data</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Third-Party Sharing</h2>
            <p>
              We share your information with trusted parties only when necessary to fulfil your order:
            </p>
            <ul>
              <li><strong>Restaurant Partners:</strong> To prepare your food order</li>
              <li><strong>Delivery Partners:</strong> Name and delivery address to complete delivery</li>
              <li><strong>Payment Processors:</strong> Easebuzz / UPI partners for secure payment</li>
              <li><strong>Legal Authorities:</strong> Only when required under Indian law</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Your Rights</h2>
            <p>Under Indian data protection laws, you have the right to:</p>
            <ul>
              <li><strong>Access your personal information</strong> stored on our platform</li>
              <li><strong>Correct inaccurate information</strong> in your account</li>
              <li><strong>Delete your account and associated data</strong></li>
              <li><strong>Opt out of marketing communications</strong> at any time</li>
              <li><strong>Request data portability</strong> in a machine-readable format</li>
              <li><strong>File a grievance</strong> with our Grievance Officer (details below)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of material
              changes via:
            </p>
            <ul>
              <li>Email notification to your registered address</li>
              <li>In-platform notification on your next login</li>
              <li>Posting the revised policy on this page with updated date</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Contact Us / Grievance Officer</h2>
            <p>
              For any questions, concerns, or data-related requests, reach us at:
            </p>
            <ul>
              <li>Email: <strong>hello@cravefood.in</strong></li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Crave Technologies, New Delhi — 110001, India</li>
            </ul>
          </section>

          <div className="policy-footer">
            <p><strong>Last Updated:</strong> 6 May 2026</p>
            <p><strong>Effective Date:</strong> 6 May 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
