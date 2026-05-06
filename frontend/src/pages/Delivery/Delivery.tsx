import React from 'react';
import './Delivery.css';

const Delivery: React.FC = () => {
  return (
    <div className="delivery-page">
      <div className="delivery-container">
        <section className="delivery-hero">
          <p className="delivery-kicker">Delivery</p>
          <h1>Delivery That Feels Local.</h1>
          <p className="delivery-lead">Clear ETAs for Delhi NCR orders.</p>
        </section>

        <section className="delivery-section">
          <h2>Coverage that matches urban ordering behaviour</h2>
          <p>
            The service language and delivery estimates are written for dense Indian neighbourhoods where timing changes by traffic,
            building access and kitchen load. That means realistic ranges, not fake certainty.
          </p>
          <div className="delivery-band">
            <div className="delivery-band-item">
              <h3>Core zones</h3>
              <p>South Delhi, Central Delhi, Gurgaon, Noida and nearby high-frequency residential clusters.</p>
            </div>
            <div className="delivery-band-item">
              <h3>Peak windows</h3>
              <p>Lunch: 12 PM to 3 PM. Evening cravings: 5 PM to 8 PM. Late-night snack rush: 9 PM onwards.</p>
            </div>
            <div className="delivery-band-item">
              <h3>Typical basket</h3>
              <p>Solo orders, office group meals, family biryani nights, fast street-food style snack drops.</p>
            </div>
          </div>
        </section>

        <section className="delivery-section delivery-section-split">
          <div className="delivery-story-block">
            <h2>Delivery structure</h2>
            <ul className="tracking-features">
              <li>Standard delivery fee starts from INR 50 and is surfaced before checkout.</li>
              <li>Orders above the free-delivery threshold are highlighted clearly on the cart journey.</li>
              <li>Online payments and cash on delivery remain available where the service area supports them.</li>
              <li>Address details, gate notes and call-on-arrival instructions remain part of the actual flow.</li>
            </ul>
          </div>
          <div className="delivery-story-block">
            <h2>Tracking that sounds human</h2>
            <ul className="special-instructions">
              <li>Order accepted and kitchen prep updates are immediate.</li>
              <li>Rider assignment appears with an ETA range instead of overconfident minute counts.</li>
              <li>Apartment, tower and gate instructions are treated as delivery-critical, not optional text.</li>
              <li>Support language stays aligned with Indian delivery expectations and address complexity.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Delivery;
