import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Builder.css';

interface BuildPreferences {
  budget: number;
  gamingType: string;
  resolution: string;
  performanceLevel: string;
}

const Builder: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<BuildPreferences>({
    budget: 1500,
    gamingType: 'AAA Titles',
    resolution: '1440p',
    performanceLevel: 'High',
  });

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ ...preferences, budget: parseInt(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/results', { state: { preferences } });
  };

  return (
    <div className="builder-page">
      <div className="builder-container">
        <div className="builder-header fade-in">
          <h1 className="builder-title">PC Builder Interface</h1>
          <p className="builder-subtitle">
            Configure your perfect gaming setup
          </p>
        </div>

        <form onSubmit={handleSubmit} className="builder-form glass-effect fade-in">
          <div className="form-section">
            <label className="form-label">Budget</label>
            <div className="budget-input-wrapper">
              <span className="budget-currency">$</span>
              <input
                type="number"
                className="budget-value"
                value={preferences.budget}
                onChange={handleBudgetChange}
                min="500"
                max="5000"
                step="50"
              />
            </div>
            <input
              type="range"
              className="budget-slider"
              min="500"
              max="5000"
              step="50"
              value={preferences.budget}
              onChange={handleBudgetChange}
            />
            <div className="slider-labels">
              <span>$500</span>
              <span>$5000</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">Gaming type</label>
              <select
                className="form-select"
                value={preferences.gamingType}
                onChange={(e) =>
                  setPreferences({ ...preferences, gamingType: e.target.value })
                }
              >
                <option value="AAA Titles">AAA Titles</option>
                <option value="Esports">Esports</option>
                <option value="Casual Gaming">Casual Gaming</option>
                <option value="Streaming">Streaming</option>
                <option value="Content Creation">Content Creation</option>
              </select>
            </div>

            <div className="form-section">
              <label className="form-label">Resolution</label>
              <select
                className="form-select"
                value={preferences.resolution}
                onChange={(e) =>
                  setPreferences({ ...preferences, resolution: e.target.value })
                }
              >
                <option value="1080p">1080p</option>
                <option value="1440p">1440p</option>
                <option value="4K">4K</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">Performance level</label>
              <select
                className="form-select"
                value={preferences.performanceLevel}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    performanceLevel: e.target.value,
                  })
                }
              >
                <option value="Budget">Budget</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
                <option value="Ultra">Ultra</option>
              </select>
            </div>

            <div className="form-section">
              <label className="form-label">Performance level</label>
              <select
                className="form-select"
                value={preferences.performanceLevel}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    performanceLevel: e.target.value,
                  })
                }
              >
                <option value="Budget">Budget</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
                <option value="Ultra">Ultra</option>
              </select>
            </div>
          </div>

          <button type="submit" className="build-button">
            Generate Build
          </button>
        </form>

        <div className="builder-info glass-effect fade-in">
          <div className="info-item">
            <div className="info-icon">💡</div>
            <div className="info-content">
              <h3 className="info-title">Smart Matching</h3>
              <p className="info-description">
                We'll find the best components that work together perfectly
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🔍</div>
            <div className="info-content">
              <h3 className="info-title">Compatibility Verified</h3>
              <p className="info-description">
                All parts are checked for compatibility automatically
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">⚡</div>
            <div className="info-content">
              <h3 className="info-title">Optimized Performance</h3>
              <p className="info-description">
                Maximum performance for your budget and requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
