import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <section className="about-hero">
          <p className="about-kicker">About Crave</p>
          <h1>Made for Indian cravings that arrive suddenly and expect to be taken seriously.</h1>
          <p className="about-lead">
            Crave is a web-first food ordering brand shaped around how people in India actually browse for meals:
            by mood, by dish name, by spice level, by time of day and by the comfort of familiar favourites.
          </p>
        </section>

        <section className="about-section">
          <div className="about-section-copy">
            <h2>What we are building</h2>
            <p>
              The focus is not generic food discovery. It is hunger-led decision making. That means clearer Indian menu labels,
              believable INR pricing, better visual mapping between the dish and the category, and copy that sounds like food
              people genuinely order in this market.
            </p>
          </div>
          <div className="about-section-points">
            <div className="about-point">
              <h3>Search by craving</h3>
              <p>Biryani, chaat, momos, rolls and thalis are treated as primary intent, not buried sub-filters.</p>
            </div>
            <div className="about-point">
              <h3>Web-first convenience</h3>
              <p>No App Store or Play Store fiction. The full experience is available directly in the browser.</p>
            </div>
            <div className="about-point">
              <h3>Food that feels local</h3>
              <p>Language, pricing and dish mix now lean into Indian buying habits instead of imported template content.</p>
            </div>
          </div>
        </section>

        <section className="about-section about-section-split">
          <div className="about-story-block">
            <h2>Why the brand sounds this way</h2>
            <p>
              People rarely open a food site looking for abstract benefits. They arrive already imagining aromas, textures,
              comfort foods and reward meals. So the writing is direct, sensory and specific. It should make the next click feel easy.
            </p>
          </div>
          <div className="about-story-block">
            <h2>What stays consistent</h2>
            <p>
              The brand keeps its dark, warm palette and editorial typography, but the messaging is tighter across every page:
              same tone, same market, same promise, and no placeholder claims that break trust.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
