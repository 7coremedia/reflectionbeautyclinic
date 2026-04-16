import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ManagementLayout.css';

export default function ManagementLayout() {
  const { role } = useAuth();
  const isWriterOnly = role === 'writer';

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__title">Management</h2>
          <span className="admin-sidebar__badge">{role}</span>
        </div>
        
        <nav className="admin-nav">
          {!isWriterOnly && (
            <>
              <NavLink to="/management" end className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}>
                 Orders
              </NavLink>
              <NavLink to="/management/products" className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}>
                 Products
              </NavLink>
            </>
          )}
          
          <NavLink to="/management/blog" className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}>
             Blog Posts
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/account" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
            My Account
          </Link>
        </div>
      </aside>
      
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
