import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Build Your
              <br />
              <span className="gradient-text">Custom Gaming PC</span>
            </h1>
            <p className="hero-subtitle fade-in">
              TOP hardware. Best price. Precise recommendations.
            </p>
            <Link to="/builder" className="hero-cta fade-in">
              Start Building
            </Link>
          </div>
          <div className="hero-image">
            <div className="pc-showcase">
              <img
                src="https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="High-end gaming PC with RGB lighting"
                className="gaming-pc-image"
              />
              <div className="glow-effect glow-1"></div>
              <div className="glow-effect glow-2"></div>
              <div className="glow-effect glow-3"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="process-container">
          <div className="process-step fade-in">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Choose Your specs</h3>
              <p className="step-description">
                Set your budget, gaming type, and performance preferences
              </p>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="process-step fade-in">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">View compatible parts</h3>
              <p className="step-description">
                Get AI-powered recommendations for perfectly matched components
              </p>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="process-step fade-in">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Get your Build</h3>
              <p className="step-description">
                Review your custom build with prices and compatibility checks
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-card glass-effect fade-in">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Smart Recommendations</h3>
            <p className="feature-description">
              Intelligent component matching based on your budget and gaming needs
            </p>
          </div>

          <div className="feature-card glass-effect fade-in">
            <div className="feature-icon">✓</div>
            <h3 className="feature-title">Compatibility Check</h3>
            <p className="feature-description">
              Automatic verification that all parts work together perfectly
            </p>
          </div>

          <div className="feature-card glass-effect fade-in">
            <div className="feature-icon">💰</div>
            <h3 className="feature-title">Best Value</h3>
            <p className="feature-description">
              Get the most performance for your budget with optimized builds
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
