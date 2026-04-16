import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Authorization...</div>;

  // If not logged in, boot to login
  if (!user) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  // If logged in, check role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Unauthorized</h2>
        <p>Your current role ({role}) does not have permission to view this page.</p>
        <p>If you believe this is an error, please contact an administrator.</p>
        <button onClick={() => window.location.href = '/'} className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Return to Store
        </button>
      </div>
    );
  }

  return <Outlet />;
}
