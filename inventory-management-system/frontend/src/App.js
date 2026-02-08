import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import InventoryTable from './components/InventoryTable';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';

const API_URL = 'http://localhost:8080/api/inventory';

function App() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all inventory
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setInventory(response.data);
    } catch (err) {
      setError('Failed to fetch inventory');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuySubmit = async (newInventory) => {
    try {
      const response = await axios.post(`${API_URL}/buy`, newInventory);
      setInventory([...inventory, response.data]);
      setShowBuyForm(false);
      setSuccess('Inventory purchased successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add inventory');
      console.error(err);
    }
  };

  const handleSellSubmit = async (releaseBags, releaseWeight) => {
    try {
      const response = await axios.post(
        `${API_URL}/sell/${selectedInventoryId}`,
        {},
        {
          params: {
            releaseBags: parseInt(releaseBags),
            releaseWeight: parseFloat(releaseWeight)
          }
        }
      );
      setInventory(inventory.map(item =>
        item.id === selectedInventoryId ? response.data : item
      ));
      setShowSellForm(false);
      setSelectedInventoryId(null);
      setSuccess('Inventory sold successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to sell inventory');
      console.error(err);
    }
  };

  const handleDeleteInventory = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setInventory(inventory.filter(item => item.id !== id));
        setSuccess('Inventory deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError('Failed to delete inventory');
        console.error(err);
      }
    }
  };

  const openSellForm = (id) => {
    setSelectedInventoryId(id);
    setShowSellForm(true);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Warehouse Inventory Management System</h1>
        <p>Manage your warehouse inventory with buy and sell operations</p>
      </header>

      <div className="app-container">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={() => setShowBuyForm(!showBuyForm)}
          >
            {showBuyForm ? 'Cancel Buy' : '+ Buy Inventory'}
          </button>
          <button
            className="btn btn-refresh"
            onClick={fetchInventory}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>

        {showBuyForm && (
          <BuyForm onSubmit={handleBuySubmit} onCancel={() => setShowBuyForm(false)} />
        )}

        {showSellForm && (
          <SellForm
            onSubmit={handleSellSubmit}
            onCancel={() => {
              setShowSellForm(false);
              setSelectedInventoryId(null);
            }}
            inventoryId={selectedInventoryId}
          />
        )}

        {loading ? (
          <div className="loading">Loading inventory...</div>
        ) : inventory.length === 0 ? (
          <div className="no-data">No inventory found. Start by adding new inventory.</div>
        ) : (
          <InventoryTable
            inventory={inventory}
            onSell={openSellForm}
            onDelete={handleDeleteInventory}
          />
        )}
      </div>
    </div>
  );
}

export default App;