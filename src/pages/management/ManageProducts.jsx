import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../lib/api';
import { Plus } from 'lucide-react';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this product? This cannot be undone.")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  }

  if (loading) return (
    <div className="admin-loading">Loading products...</div>
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Management</p>
          <h1 className="admin-title">Products</h1>
        </div>
        <Link to="/management/products/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="5" className="admin-empty-cell">No products found.</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--gray-light)' }}
                      />
                    ) : (
                      <div style={{
                        width: '44px', height: '44px',
                        background: `linear-gradient(135deg, ${product.shade || '#c9d4c5'}88, ${product.shade || '#c9d4c5'})`,
                        borderRadius: '10px'
                      }} />
                    )}
                  </td>
                  <td>
                    <span className="admin-cell-title">{product.name}</span>
                    <span className="admin-cell-sub">{product.subtitle}</span>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                  <td><strong>₦{Number(product.price).toLocaleString()}</strong></td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/management/products/${product.id}`} className="admin-action-btn edit">Edit</Link>
                      <button onClick={() => handleDelete(product.id)} className="admin-action-btn delete">Delete</button>
                    </div>
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
