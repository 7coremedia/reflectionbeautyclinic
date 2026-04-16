import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../lib/api';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  }

  if (loading) return <div>Loading Products...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Products</h1>
        <Link to="/management/products/new" className="btn btn-primary">Add Product</Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${product.shade}88, ${product.shade})`, borderRadius: '4px' }} />
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <br/>
                  <span style={{ fontSize: '0.85em', color: '#666' }}>{product.subtitle}</span>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                <td>£{product.price}</td>
                <td>
                  <div className="admin-actions">
                    <Link to={`/management/products/${product.id}`} className="admin-action-btn edit">Edit</Link>
                    <button onClick={() => handleDelete(product.id)} className="admin-action-btn delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
