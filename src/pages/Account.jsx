import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Account() {
  const { user, role, signOut, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-redirect if they came from a protected route
  const from = location.state?.from?.pathname || '/management';

  useEffect(() => {
    // If we have a user and they are an admin, and we haven't auto-redirected yet
    if (user && role && ['admin', 'manager', 'writer', 'moderator'].includes(role)) {
       // Optional: Add auto-redirect logic here if desired
       // navigate(from, { replace: true });
    }
  }, [user, role, from, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    console.log(`Attempting ${isLogin ? 'Login' : 'Signup'} for:`, email);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        setSuccessMsg('Login successful! Redirecting...');
        // Small delay to let the AuthContext catch up and the user see the success message
        setTimeout(() => {
          if (from.startsWith('/management')) {
            navigate(from, { replace: true });
          } else {
            navigate('/management', { replace: true });
          }
        }, 1000);

      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccessMsg('Account created! Please check your email for verification.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Auth Error:', err.message);
      setErrorMsg(err.message === 'Invalid login credentials' 
        ? 'Invalid email or password. Please try again.' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="flex-center" style={{ minHeight: '80vh' }}>Verifying session...</div>;

  // Render Dashboard if already authenticated
  if (user) {
    return (
      <div className="page-enter flex-center flex-column" style={{ paddingTop: '100px', minHeight: '80vh', backgroundColor: 'var(--cream-dark)' }}>
        <div style={{ background: 'var(--warm-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <div className="badge badge-gold mb-3">Verified Session</div>
          <h1 className="heading-md mb-2">Welcome Back</h1>
          <p className="body-md" style={{ color: 'var(--stone)', marginBottom: '2rem' }}>{user.email}</p>

          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--pearl)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)' }}>Access Level</span>
            <div style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--near-black)', textTransform: 'capitalize', marginTop: '0.5rem' }}>{role}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['admin', 'manager', 'writer', 'moderator'].includes(role) ? (
              <Link to="/management" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Enter Admin Dashboard →
              </Link>
            ) : (
              <Link to="/shop" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Continue Shopping
              </Link>
            )}
            <button onClick={signOut} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Sign Out</button>
          </div>
        </div>
      </div>
    );
  }

  // Render Auth Forms if logged out
  return (
    <div className="page-enter flex-center" style={{ paddingTop: '100px', minHeight: '80vh', backgroundColor: 'var(--cream-dark)' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{ background: 'var(--warm-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="text-center mb-4">
            <h1 className="heading-lg" style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Reflection Portal' : 'Create Account'}</h1>
            <p className="body-md" style={{ color: 'var(--stone)' }}>
              {isLogin ? 'Sign in to manage the clinic and shop.' : 'Join the Reflection community today.'}
            </p>
          </div>

          {errorMsg && (
            <div style={{ color: '#d32f2f', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', background: '#ffebee', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ffcdd2' }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ color: '#2e7d32', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', background: '#e8f5e9', padding: '0.75rem', borderRadius: '4px', border: '1px solid #c8e6c9' }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleAuth} id="login-form">
            <div className="admin-form-group mb-3">
              <label style={{ fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="name@example.com" 
                required 
                style={{ width: '100%' }} 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="admin-form-group mb-4">
              <label style={{ fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                required 
                style={{ width: '100%' }} 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem' }} 
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   Authenticating...
                </span>
              ) : (isLogin ? 'Sign In to Dashboard' : 'Create Account')}
            </button>
          </form>
          
          <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--sand)' }}>
            <p className="body-md" style={{ color: 'var(--stone)' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                style={{ color: 'var(--near-black)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
