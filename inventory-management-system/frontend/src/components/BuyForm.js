import React, { useState } from 'react';
import '../styles/Form.css';

function BuyForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    warehouseName: '',
    clientName: '',
    depositionDate: '',
    cirNo: '',
    storageReceiptNo: '',
    truckNoIn: '',
    commodity: '',
    moisture: '',
    noOfBags: '',
    wtInMt: '',
    marketRate: '',
    aum: '',
    fundingBank: '',
    loanDate: '',
    laplg: '',
    loanAmount: '',
    fumigationDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.warehouseName || !formData.clientName || !formData.commodity ||
        !formData.noOfBags || !formData.wtInMt) {
      alert('Please fill in all required fields');
      return;
    }

    // Convert string numbers to actual numbers
    const inventoryData = {
      ...formData,
      depositionDate: formData.depositionDate ? new Date(formData.depositionDate).toISOString().split('T')[0] : null,
      loanDate: formData.loanDate ? new Date(formData.loanDate).toISOString().split('T')[0] : null,
      fumigationDate: formData.fumigationDate ? new Date(formData.fumigationDate).toISOString().split('T')[0] : null,
      moisture: formData.moisture ? parseFloat(formData.moisture) : null,
      noOfBags: parseInt(formData.noOfBags),
      wtInMt: parseFloat(formData.wtInMt),
      marketRate: formData.marketRate ? parseFloat(formData.marketRate) : null,
      loanAmount: formData.loanAmount ? parseFloat(formData.loanAmount) : null
    };

    onSubmit(inventoryData);
    setFormData({
      warehouseName: '',
      clientName: '',
      depositionDate: '',
      cirNo: '',
      storageReceiptNo: '',
      truckNoIn: '',
      commodity: '',
      moisture: '',
      noOfBags: '',
      wtInMt: '',
      marketRate: '',
      aum: '',
      fundingBank: '',
      loanDate: '',
      laplg: '',
      loanAmount: '',
      fumigationDate: ''
    });
  };

  return (
    <div className="form-container">
      <h2>Buy Inventory</h2>
      <form onSubmit={handleSubmit} className="buy-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Warehouse Name *</label>
              <input
                type="text"
                name="warehouseName"
                value={formData.warehouseName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Client Name *</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Commodity *</label>
              <input
                type="text"
                name="commodity"
                value={formData.commodity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>CIR No</label>
              <input
                type="text"
                name="cirNo"
                value={formData.cirNo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Inventory Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Deposition Date</label>
              <input
                type="date"
                name="depositionDate"
                value={formData.depositionDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Truck No (In)</label>
              <input
                type="text"
                name="truckNoIn"
                value={formData.truckNoIn}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Storage Receipt No</label>
              <input
                type="text"
                name="storageReceiptNo"
                value={formData.storageReceiptNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Moisture %</label>
              <input
                type="number"
                step="0.01"
                name="moisture"
                value={formData.moisture}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Quantity & Weight</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Number of Bags *</label>
              <input
                type="number"
                name="noOfBags"
                value={formData.noOfBags}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (MT) *</label>
              <input
                type="number"
                step="0.01"
                name="wtInMt"
                value={formData.wtInMt}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Market Rate</label>
              <input
                type="number"
                step="0.01"
                name="marketRate"
                value={formData.marketRate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>AUM</label>
              <input
                type="text"
                name="aum"
                value={formData.aum}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Loan & Funding Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Funding Bank</label>
              <input
                type="text"
                name="fundingBank"
                value={formData.fundingBank}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Loan Date</label>
              <input
                type="date"
                name="loanDate"
                value={formData.loanDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>LAPLG</label>
              <input
                type="text"
                name="laplg"
                value={formData.laplg}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Loan Amount</label>
              <input
                type="number"
                step="0.01"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Other Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Fumigation Date</label>
              <input
                type="date"
                name="fumigationDate"
                value={formData.fumigationDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            Submit Buy
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyForm;