import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, createProduct, updateProduct, uploadProductImage } from '../../lib/api';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    id: `rfl-${Date.now()}`, // Temporary basic ID generation for new items
    name: '',
    subtitle: '',
    price: '',
    original_price: '',
    category_id: 'serums',
    badge: '',
    shade: '#F5E6C8',
    description: '',
    benefits: '', // we will split by comma
    size: '30ml',
    ingredients: '',
  });

  useEffect(() => {
    if (isEditing) {
      async function fetchProduct() {
        const prod = await getProductById(id);
        if (prod) {
          setFormData({
            ...prod,
            original_price: prod.original_price || '',
            badge: prod.badge || '',
            benefits: Array.isArray(prod.benefits) ? prod.benefits.join(', ') : '',
          });
        }
        setLoading(false);
      }
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadingImage(true);
    
    try {
      let imageUrl = formData.image_url || null;

      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        badge: formData.badge || null,
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(Boolean),
        image_url: imageUrl
      };

      if (isEditing) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/management/products');
    } catch (err) {
      console.error(err);
      alert("Error saving product. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">{isEditing ? 'Edit Product' : 'New Product'}</h1>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="admin-form-group">
              <label>Unique ID Code</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} required disabled={isEditing} />
            </div>
            <div className="admin-form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label>Category ID</label>
              <select name="category_id" value={formData.category_id} onChange={handleChange} required>
                <option value="serums">Serums</option>
                <option value="moisturisers">Moisturisers</option>
                <option value="treatments">Treatments</option>
                <option value="cleansers">Cleanse & Tone</option>
                <option value="spf">SPF</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-group">
              <label>Price (£)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
            </div>
            <div className="admin-form-group">
              <label>Original Price (£) (Optional)</label>
              <input type="number" name="original_price" value={formData.original_price} onChange={handleChange} step="0.01" />
            </div>
          </div>

          <div className="grid-3">
            <div className="admin-form-group">
              <label>Badge (e.g. Bestseller)</label>
              <input type="text" name="badge" value={formData.badge} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label>Shade (Hex Color Code)</label>
              <input type="text" name="shade" value={formData.shade} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Size (e.g. 30ml)</label>
              <input type="text" name="size" value={formData.size} onChange={handleChange} required />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="admin-form-group">
            <label>Benefits (Comma separated)</label>
            <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} />
          </div>

          <div className="admin-form-group">
            <label>Product Image</label>
            {formData.image_url && !imageFile && (
              <div style={{ marginBottom: '1rem' }}>
                <img src={formData.image_url} alt="Current Product" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>

          <div className="admin-form-group">
            <label>Ingredients</label>
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} style={{minHeight: '80px'}} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={uploadingImage}>
              {uploadingImage ? 'Uploading & Saving...' : (isEditing ? 'Save Changes' : 'Create Product')}
            </button>
            <button type="button" onClick={() => navigate('/management/products')} className="btn btn-outline" disabled={uploadingImage}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
