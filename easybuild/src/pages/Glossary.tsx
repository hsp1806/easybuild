import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Glossary.css';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

const Glossary: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .order('term', { ascending: true });

      if (error) throw error;

      if (data) {
        setTerms(data);
        setFilteredTerms(data);
      }
    } catch (error) {
      console.error('Error fetching glossary terms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = terms;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((term) => term.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTerms(filtered);
  }, [selectedCategory, searchQuery, terms]);

  const uniqueCategories = new Set(terms.map((term) => term.category));
  const categories = ['all', ...Array.from(uniqueCategories)];

  if (loading) {
    return (
      <div className="glossary-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading glossary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glossary-page">
      <div className="glossary-container">
        <div className="glossary-header fade-in">
          <h1 className="glossary-title">PC Building Glossary</h1>
          <p className="glossary-subtitle">
            Learn the essential terminology for building your gaming PC
          </p>
        </div>

        <div className="glossary-controls glass-effect fade-in">
          <input
            type="text"
            className="search-input"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filteredTerms.length === 0 ? (
          <div className="no-results glass-effect fade-in">
            <p>No terms found matching your search.</p>
          </div>
        ) : (
          <div className="terms-grid">
            {filteredTerms.map((term) => (
              <div key={term.id} className="term-card glass-effect fade-in">
                <div className="term-header">
                  <h3 className="term-name">{term.term}</h3>
                  <span className="term-category">{term.category}</span>
                </div>
                <p className="term-definition">{term.definition}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;
