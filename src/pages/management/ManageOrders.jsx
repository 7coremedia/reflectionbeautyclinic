import { useState, useEffect } from 'react';
import { getOrders } from '../../lib/api';

const statusConfig = {
  pending: { bg: '#FFF8E6', color: '#B45309', label: 'Pending' },
  completed: { bg: '#ECFDF5', color: '#065F46', label: 'Completed' },
  cancelled: { bg: '#FEF2F2', color: '#991B1B', label: 'Cancelled' },
};

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) return (
    <div className="admin-loading">
      <div className="admin-loading-dot" />
      Loading orders...
    </div>
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Management</p>
          <h1 className="admin-title">Orders</h1>
        </div>
        <div className="admin-stat-chip">
          {orders.length} total
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="admin-empty-cell">No orders found yet.</td>
              </tr>
            ) : (
              orders.map(order => {
                const status = statusConfig[order.status] || statusConfig.pending;
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="admin-mono">{order.id.slice(0, 8)}...</span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <span className="admin-cell-title">{order.first_name} {order.last_name}</span>
                      <span className="admin-cell-sub">{order.email}</span>
                    </td>
                    <td><strong>₦{Number(order.total_amount).toLocaleString()}</strong></td>
                    <td>
                      <span className="admin-status-badge" style={{ background: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
