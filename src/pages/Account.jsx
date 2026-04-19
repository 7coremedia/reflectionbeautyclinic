import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './Account.css';

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

  const from = location.state?.from?.pathname || '/management';

  useEffect(() => {
    if (user && role && ['admin', 'manager', 'writer', 'moderator'].includes(role)) {
       // navigate(from, { replace: true });
    }
  }, [user, role, from, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccessMsg('Login successful! Redirecting...');
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
      setErrorMsg(err.message === 'Invalid login credentials'
        ? 'Invalid email or password. Please try again.'
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return (
    <div className="account-page">
      <div className="account-loading">Verifying session...</div>
    </div>
  );

  if (user) {
    return (
      <div className="account-page page-enter">
        <div className="account-split">
          <div className="account-brand-panel">
            <div className="account-brand-inner">
              <span className="account-brand-eyebrow">Welcome back</span>
              <h1 className="account-brand-headline">Your<br /><em>Reflection</em><br />Portal.</h1>
              <p className="account-brand-sub">Clinical care, craft products, and your clinic — all in one secure dashboard.</p>
            </div>
          </div>
          <div className="account-form-panel">
            <div className="account-card">
              <div className="account-session-badge">Verified Session</div>
              <h2 className="account-card-title">Welcome Back</h2>
              <p className="account-card-email">{user.email}</p>
              <div className="account-role-chip">
                <span className="account-role-label">Access Level</span>
                <span className="account-role-value">{role}</span>
              </div>
              <div className="account-card-actions">
                {['admin', 'manager', 'writer', 'moderator'].includes(role) ? (
                  <Link to="/management" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Enter Admin Dashboard →
                  </Link>
                ) : (
                  <Link to="/shop" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Continue Shopping
                  </Link>
                )}
                <button onClick={signOut} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page page-enter">
      <div className="account-split">
        <div className="account-brand-panel">
          <div className="account-brand-inner">
            <span className="account-brand-eyebrow">Reflection Beauty Clinic</span>
            <h1 className="account-brand-headline">Skin that<br /><em>reflects</em><br />who you are.</h1>
            <p className="account-brand-sub">Sign in to manage clinic operations, view orders, publish posts, and more.</p>
          </div>
        </div>
        <div className="account-form-panel">
          <div className="account-card">
            <h2 className="account-card-title">{isLogin ? 'Portal Sign In' : 'Create Account'}</h2>
            <p className="account-card-subtitle">{isLogin ? 'Access your management dashboard.' : 'Join the Reflection community.'}</p>

            {errorMsg && (
              <div className="account-alert account-alert--error">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="account-alert account-alert--success">{successMsg}</div>
            )}

            <form onSubmit={handleAuth} id="login-form">
              <div className="account-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="account-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', height: '54px', fontSize: '1rem', marginTop: '1.5rem' }}
                disabled={loading}
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In to Dashboard' : 'Create Account')}
              </button>
            </form>

            <div className="account-toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
