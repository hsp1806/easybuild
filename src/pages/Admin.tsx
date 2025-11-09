import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Admin.css';

interface Part {
  id?: string;
  type: string;
  name: string;
  price: number;
  score: number;
  image_url?: string;
  description: string;
  specs: any;
}

const Admin: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const emptyPart: Part = {
    type: 'cpu',
    name: '',
    price: 0,
    score: 0,
    description: '',
    specs: {},
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const { data, error } = await supabase
        .from('pc_parts')
        .select('*')
        .order('type', { ascending: true });

      if (error) throw error;

      if (data) {
        setParts(data);
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPart) return;

    try {
      if (editingPart.id) {
        const { error } = await supabase
          .from('pc_parts')
          .update(editingPart)
          .eq('id', editingPart.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pc_parts')
          .insert([editingPart]);

        if (error) throw error;
      }

      await fetchParts();
      setEditingPart(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving part:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this part?')) return;

    try {
      const { error } = await supabase
        .from('pc_parts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  const handleEdit = (part: Part) => {
    setEditingPart({ ...part });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingPart({ ...emptyPart });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingPart(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header fade-in">
          <h1 className="admin-title">Admin Panel</h1>
          <button className="add-button" onClick={handleNew}>
            + Add New Part
          </button>
        </div>

        {showForm && editingPart && (
          <div className="form-modal">
            <form onSubmit={handleSubmit} className="part-form glass-effect fade-in">
              <div className="form-header">
                <h2 className="form-title">
                  {editingPart.id ? 'Edit Part' : 'Add New Part'}
                </h2>
                <button
                  type="button"
                  className="close-button"
                  onClick={handleCancel}
                >
                  ✕
                </button>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="field-label">Type</label>
                  <select
                    className="field-input"
                    value={editingPart.type}
                    onChange={(e) =>
                      setEditingPart({ ...editingPart, type: e.target.value })
                    }
                    required
                  >
                    <option value="cpu">CPU</option>
                    <option value="gpu">GPU</option>
                    <option value="motherboard">Motherboard</option>
                    <option value="ram">RAM</option>
                    <option value="storage">Storage</option>
                    <option value="psu">PSU</option>
                    <option value="case">Case</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="field-label">Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={editingPart.name}
                    onChange={(e) =>
                      setEditingPart({ ...editingPart, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Price ($)</label>
                  <input
                    type="number"
                    className="field-input"
                    value={editingPart.price}
                    onChange={(e) =>
                      setEditingPart({
                        ...editingPart,
                        price: parseFloat(e.target.value),
                      })
                    }
                    required
                    step="0.01"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Score (0-100)</label>
                  <input
                    type="number"
                    className="field-input"
                    value={editingPart.score}
                    onChange={(e) =>
                      setEditingPart({
                        ...editingPart,
                        score: parseInt(e.target.value),
                      })
                    }
                    required
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-field full-width">
                  <label className="field-label">Description</label>
                  <textarea
                    className="field-input"
                    value={editingPart.description}
                    onChange={(e) =>
                      setEditingPart({
                        ...editingPart,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="form-field full-width">
                  <label className="field-label">Image URL</label>
                  <input
                    type="url"
                    className="field-input"
                    value={editingPart.image_url || ''}
                    onChange={(e) =>
                      setEditingPart({
                        ...editingPart,
                        image_url: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-field full-width">
                  <label className="field-label">Specs (JSON)</label>
                  <textarea
                    className="field-input"
                    value={JSON.stringify(editingPart.specs, null, 2)}
                    onChange={(e) => {
                      try {
                        const specs = JSON.parse(e.target.value);
                        setEditingPart({ ...editingPart, specs });
                      } catch (err) {
                      }
                    }}
                    rows={4}
                    placeholder='{"socket": "AM4", "tdp": 65}'
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingPart.id ? 'Update Part' : 'Add Part'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="parts-table glass-effect fade-in">
          <div className="table-header">
            <div className="header-cell">Type</div>
            <div className="header-cell">Name</div>
            <div className="header-cell">Price</div>
            <div className="header-cell">Score</div>
            <div className="header-cell">Actions</div>
          </div>

          <div className="table-body">
            {parts.map((part) => (
              <div key={part.id} className="table-row">
                <div className="table-cell">{part.type.toUpperCase()}</div>
                <div className="table-cell">{part.name}</div>
                <div className="table-cell">${part.price}</div>
                <div className="table-cell">{part.score}</div>
                <div className="table-cell actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(part)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(part.id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
