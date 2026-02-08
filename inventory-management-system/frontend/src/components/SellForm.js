import React, { useState } from 'react';
import '../styles/Form.css';

function SellForm({ onSubmit, onCancel, inventoryId }) {
  const [formData, setFormData] = useState({
    releaseBags: '',
    releaseWeight: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.releaseBags || !formData.releaseWeight) {
      setError('Please enter both bags and weight');
      return;
    }

    if (isNaN(formData.releaseBags) || isNaN(formData.releaseWeight)) {
      setError('Please enter valid numbers');
      return;
    }

    onSubmit(formData.releaseBags, formData.releaseWeight);
    setFormData({ releaseBags: '', releaseWeight: '' });
  };

  return (
    <div className="form-container">
      <h2>Sell Inventory (ID: {inventoryId})</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>Release Bags *</label>
              <input
                type="number"
                name="releaseBags"
                value={formData.releaseBags}
                onChange={handleChange}
                placeholder="Number of bags to release"
                required
              />
            </div>
            <div className="form-group">
              <label>Release Weight (MT) *</label>
              <input
                type="number"
                step="0.01"
                name="releaseWeight"
                value={formData.releaseWeight}
                onChange={handleChange}
                placeholder="Weight to release in MT"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            Confirm Sell
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellForm;