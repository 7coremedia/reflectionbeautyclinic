import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, deleteBlogPost } from '../../lib/api';

export default function ManageBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogPost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to delete blog post.");
      }
    }
  }

  if (loading) return <div>Loading Journal Entries...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Journal Entries</h1>
        <Link to="/management/blog/new" className="btn btn-primary">Create Post</Link>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time to Read</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No posts found.</td></tr>
            ) : (
              posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                  </td>
                  <td>{post.category}</td>
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
