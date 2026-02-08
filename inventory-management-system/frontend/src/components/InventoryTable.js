import React from 'react';
import '../styles/InventoryTable.css';

function InventoryTable({ inventory, onSell, onDelete }) {
  return (
    <div className="table-container">
      <h2>Current Inventory</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Warehouse</th>
            <th>Client</th>
            <th>Commodity</th>
            <th>Bags</th>
            <th>Weight (MT)</th>
            <th>Balance Bags</th>
            <th>Balance Weight</th>
            <th>Market Rate</th>
            <th>Deposition Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.warehouseName}</td>
              <td>{item.clientName}</td>
              <td>{item.commodity}</td>
              <td>{item.noOfBags}</td>
              <td>{item.wtInMt?.toFixed(2)}</td>
              <td className={item.balanceBags < 0 ? 'negative' : ''}>{item.balanceBags}</td>
              <td className={item.balanceWeight < 0 ? 'negative' : ''}>{item.balanceWeight?.toFixed(2)}</td>
              <td>{item.marketRate?.toFixed(2)}</td>
              <td>{item.depositionDate}</td>
              <td className="actions">
                <button
                  className="btn btn-sell"
                  onClick={() => onSell(item.id)}
                  title="Sell this inventory"
                >
                  Sell
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(item.id)}
                  title="Delete this inventory"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;