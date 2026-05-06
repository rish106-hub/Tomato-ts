import React from 'react';
import './Delivery.css';

const Delivery: React.FC = () => {
  return (
    <div className="delivery-page">
      <div className="delivery-container">
        <h1>Delivery Across Delhi NCR</h1>
        <div className="delivery-content">
          <section className="delivery-section">
            <h2>Where We Deliver</h2>
            <p>
              Crave delivers to 40+ neighbourhoods across Delhi NCR. If you can see us on the map,
              we'll be at your door — hot, fresh, and on time.
            </p>
            <div className="areas-grid">
              <div className="area-item">
                <h3>Central Delhi</h3>
                <p>Connaught Place, Karol Bagh, Paharganj</p>
                <span className="area-eta">Avg: 20–25 mins</span>
              </div>
              <div className="area-item">
                <h3>South Delhi</h3>
                <p>Hauz Khas, Lajpat Nagar, Saket, Greater Kailash</p>
                <span className="area-eta">Avg: 25–35 mins</span>
              </div>
              <div className="area-item">
                <h3>Noida</h3>
                <p>Sector 18, 62, 63, 125, 137</p>
                <span className="area-eta">Avg: 30–40 mins</span>
              </div>
              <div className="area-item">
                <h3>Gurgaon</h3>
                <p>Cyber City, Golf Course Road, MG Road, Sohna Road</p>
                <span className="area-eta">Avg: 30–40 mins</span>
              </div>
              <div className="area-item">
                <h3>North Delhi</h3>
                <p>Rohini, Pitampura, Model Town, Kamla Nagar</p>
                <span className="area-eta">Avg: 25–35 mins</span>
              </div>
              <div className="area-item">
                <h3>East Delhi</h3>
                <p>Laxmi Nagar, Preet Vihar, Mayur Vihar</p>
                <span className="area-eta">Avg: 25–35 mins</span>
              </div>
            </div>
          </section>

          <section className="delivery-section">
            <h2>Delivery Options</h2>
            <div className="delivery-options">
              <div className="option-item">
                <h3>Standard Delivery</h3>
                <p>Free delivery on orders above ₹499</p>
                <p>Delivery fee ₹30–₹50 on smaller orders</p>
              </div>
              <div className="option-item">
                <h3>Priority Delivery</h3>
                <p>Your order jumps the queue — arrives in under 25 minutes</p>
                <p>Additional ₹40 priority fee</p>
              </div>
              <div className="option-item">
                <h3>Scheduled Delivery</h3>
                <p>Order up to 24 hours in advance — plan your meals, your way</p>
                <p>No additional charge</p>
              </div>
            </div>
          </section>

          <section className="delivery-section">
            <h2>Real-Time Order Tracking</h2>
            <p>
              From the moment you tap "Order Now" to the second the bag lands at your door,
              you know exactly where your food is. No more "5 minutes ho jayega" guesses.
            </p>
            <ul className="tracking-features">
              <li>Order confirmed instantly</li>
              <li>Restaurant starts prep — live status update</li>
              <li>Delivery partner assigned with ETA</li>
              <li>Live map tracking en route</li>
              <li>Arrival notification on your phone</li>
            </ul>
          </section>

          <section className="delivery-section">
            <h2>Delivery Instructions</h2>
            <p>
              Tell us exactly how you want it delivered — we'll pass every word to your delivery partner:
            </p>
            <ul className="special-instructions">
              <li>Ring the bell / call on arrival</li>
              <li>Leave at the door (contactless)</li>
              <li>Specific gate or building entrance details</li>
              <li>Handling instructions — extra careful with liquids, etc.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
