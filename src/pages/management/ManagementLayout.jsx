import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutGrid, Package, BookOpen, User, ExternalLink, Menu, X } from 'lucide-react';
import './ManagementLayout.css';

export default function ManagementLayout() {
  const { role } = useAuth();
  const isWriterOnly = role === 'writer';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* Mobile top bar */}
      <div className="admin-mobile-topbar">
        <button className="admin-mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <span className="admin-mobile-brand">Reflection</span>
        <span className="admin-sidebar__badge">{role}</span>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={closeSidebar} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__title">Reflection</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="admin-sidebar__badge">{role}</span>
            <button className="admin-sidebar-close" onClick={closeSidebar} aria-label="Close menu">
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="admin-nav">
          {!isWriterOnly && (
            <>
              <NavLink to="/management" end className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`} onClick={closeSidebar}>
                <LayoutGrid size={16} />
                Orders
              </NavLink>
              <NavLink to="/management/products" className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`} onClick={closeSidebar}>
                <Package size={16} />
                Products
              </NavLink>
            </>
          )}
          <NavLink to="/management/blog" className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`} onClick={closeSidebar}>
            <BookOpen size={16} />
            Blog Posts
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/account" className="admin-nav__link" style={{ width: '100%', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.4)' }} onClick={closeSidebar}>
            <User size={16} />
            My Account
          </Link>
          <Link to="/" className="admin-nav__link" style={{ width: '100%', color: 'rgba(255,255,255,0.4)' }} onClick={closeSidebar}>
            <ExternalLink size={16} />
            View Website
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
