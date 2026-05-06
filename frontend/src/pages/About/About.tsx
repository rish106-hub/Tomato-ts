import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Crave</h1>
        <div className="about-content">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, Crave started with a simple obsession: food should arrive
              exactly the way the chef intended it — hot, fresh, and on time. We're building
              the food delivery platform that treats every order like it matters, because it does.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              To eliminate the gap between craving and satisfaction. We connect food lovers
              with the city's finest kitchens through technology that gets out of the way —
              fast, frictionless, and reliable every single time.
            </p>
          </section>

          <section className="about-section">
            <h2>Why Choose Crave?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Fast Delivery</h3>
                <p>30-minute delivery guarantee or your money back</p>
              </div>
              <div className="feature-item">
                <h3>Curated Quality</h3>
                <p>Partnered only with kitchens that meet our standards</p>
              </div>
              <div className="feature-item">
                <h3>Zero Friction</h3>
                <p>From craving to checkout in under 60 seconds</p>
              </div>
              <div className="feature-item">
                <h3>24/7 Support</h3>
                <p>Real humans, always available when you need us</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Team</h2>
            <p>
              We're a team of food obsessives and engineers who believe the best meal
              is the one you didn't have to wait for. We're endlessly iterating to make
              Crave the most satisfying food experience in the city.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
