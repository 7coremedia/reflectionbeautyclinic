import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, deleteBlogPost } from '../../lib/api';
import { Plus } from 'lucide-react';

export default function ManageBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this post? This cannot be undone.")) {
      try {
        await deleteBlogPost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to delete blog post.");
      }
    }
  }

  if (loading) return (
    <div className="admin-loading">Loading journal entries...</div>
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Management</p>
          <h1 className="admin-title">Journal Entries</h1>
        </div>
        <Link to="/management/blog/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Create Post
        </Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Read Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td colSpan="5" className="admin-empty-cell">No posts yet. Create your first entry.</td></tr>
            ) : (
              posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <span className="admin-cell-title">{post.title}</span>
                    {post.excerpt && (
                      <span className="admin-cell-sub" style={{ maxWidth: '300px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {post.excerpt}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="admin-status-badge" style={{ background: 'var(--base-bg)', color: 'var(--black-soft)' }}>
                      {post.category}
                    </span>
                  </td>
                  <td>{post.date}</td>
                  <td>{post.read_time}</td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/management/blog/${post.id}`} className="admin-action-btn edit">Edit</Link>
                      <button onClick={() => handleDelete(post.id)} className="admin-action-btn delete">Delete</button>
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
