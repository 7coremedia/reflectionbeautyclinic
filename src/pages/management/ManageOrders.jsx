import { useState, useEffect } from 'react';
import { getOrders } from '../../lib/api';

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

  if (loading) return <div>Loading Orders...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Orders</h1>
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
                <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>No orders found.</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontFamily: 'monospace' }}>{order.id.slice(0, 8)}...</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.first_name} {order.last_name}<br/><span style={{fontSize: '0.8rem', color: '#666'}}>{order.email}</span></td>
                  <td>£{order.total_amount}</td>
                  <td>
                    <span style={{ 
                      padding: '0.2rem 0.5rem', 
                      background: order.status === 'pending' ? '#fff3cd' : '#d4edda',
                      color: order.status === 'pending' ? '#856404' : '#155724',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
