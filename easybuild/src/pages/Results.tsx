import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Results.css';

interface Part {
  id: string;
  type: string;
  name: string;
  price: number;
  score: number;
  image_url?: string;
  description: string;
  specs: any;
}

interface BuildResult {
  cpu: Part | null;
  gpu: Part | null;
  motherboard: Part | null;
  ram: Part | null;
  storage: Part | null;
  psu: Part | null;
  case: Part | null;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [build, setBuild] = useState<BuildResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const preferences = location.state?.preferences;

  useEffect(() => {
    if (!preferences) {
      navigate('/builder');
      return;
    }

    const fetchBuild = async () => {
      try {
        const { data: parts, error } = await supabase
          .from('pc_parts')
          .select('*')
          .order('price', { ascending: true });

        if (error) throw error;

        if (parts && parts.length > 0) {
          const buildResult: BuildResult = {
            cpu: parts.find((p) => p.type === 'cpu') || null,
            gpu: parts.find((p) => p.type === 'gpu') || null,
            motherboard: parts.find((p) => p.type === 'motherboard') || null,
            ram: parts.find((p) => p.type === 'ram') || null,
            storage: parts.find((p) => p.type === 'storage') || null,
            psu: parts.find((p) => p.type === 'psu') || null,
            case: parts.find((p) => p.type === 'case') || null,
          };
          setBuild(buildResult);
        }
      } catch (error) {
        console.error('Error fetching build:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [preferences, navigate]);

  const getTotalCost = (): number => {
    if (!build) return 0;
    return Object.values(build).reduce((sum, part) => {
      return sum + (part?.price || 0);
    }, 0);
  };

  const getPartIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      cpu: '🔲',
      gpu: '🎮',
      motherboard: '⚡',
      ram: '💾',
      storage: '💿',
      psu: '🔌',
      case: '📦',
    };
    return icons[type] || '⚙️';
  };

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Building your perfect PC...</p>
        </div>
      </div>
    );
  }

  const totalCost = getTotalCost();
  const budgetDiff = preferences?.budget - totalCost;

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header fade-in">
          <div className="header-content">
            <h1 className="results-title">Build Strous</h1>
            <div className="build-meta">
              <span className="build-label">COST</span>
              <span className="build-cost">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="budget-summary glass-effect">
            <div className="budget-info">
              <span className="budget-label">Your Budget</span>
              <span className="budget-amount">${preferences?.budget || 0}</span>
            </div>
            <div className="budget-info">
              <span className="budget-label">
                {budgetDiff >= 0 ? 'Under Budget' : 'Over Budget'}
              </span>
              <span
                className={`budget-amount ${
                  budgetDiff >= 0 ? 'positive' : 'negative'
                }`}
              >
                ${Math.abs(budgetDiff).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="parts-grid">
          {build &&
            Object.entries(build).map(([type, part]) => (
              <div
                key={type}
                className="part-card glass-effect fade-in"
                onClick={() => setSelectedPart(part)}
              >
                <div className="part-header">
                  <span className="part-icon">{getPartIcon(type)}</span>
                  <span className="part-type">
                    {type.toUpperCase().replace('_', ' ')}
                  </span>
                </div>

                {part ? (
                  <>
                    <div className="part-content">
                      <h3 className="part-name">{part.name}</h3>
                      <p className="part-description">{part.description}</p>
                    </div>

                    <div className="part-footer">
                      <div className="part-price">${part.price}</div>
                      <div className="part-specs">
                        {part.specs?.tdp && (
                          <span className="spec-badge">{part.specs.tdp}W</span>
                        )}
                        {part.specs?.socket && (
                          <span className="spec-badge">{part.specs.socket}</span>
                        )}
                        {part.specs?.ram_type && (
                          <span className="spec-badge">{part.specs.ram_type}</span>
                        )}
                      </div>
                    </div>

                    <div className="compatibility-badge">
                      <span className="check-icon">✓</span>
                      Compatible
                    </div>
                  </>
                ) : (
                  <div className="part-empty">
                    <p>No part available</p>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="results-actions fade-in">
          <button className="action-button secondary" onClick={() => navigate('/builder')}>
            Modify Build
          </button>
          <button className="action-button primary">
            Save Build
          </button>
        </div>
      </div>

      {selectedPart && (
        <div className="modal-overlay" onClick={() => setSelectedPart(null)}>
          <div className="modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPart(null)}>
              ✕
            </button>
            <div className="modal-header">
              <h2 className="modal-title">{selectedPart.name}</h2>
              <div className="modal-price">${selectedPart.price}</div>
            </div>
            <p className="modal-description">{selectedPart.description}</p>
            <div className="modal-specs">
              <h3 className="specs-title">Specifications</h3>
              <div className="specs-grid">
                {Object.entries(selectedPart.specs || {}).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key.replace('_', ' ')}:</span>
                    <span className="spec-value">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
