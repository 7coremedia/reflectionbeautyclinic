import { useState } from 'react';

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page-enter flex-center" style={{ paddingTop: '100px', minHeight: '80vh', backgroundColor: 'var(--cream-dark)' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{ background: 'var(--warm-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="text-center mb-4">
            <h1 className="heading-lg" style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="body-md" style={{ color: 'var(--stone)' }}>{isLogin ? 'Sign in to access your orders and rituals.' : 'Join to track orders and save your rituals.'}</p>
          </div>
          
          <form onSubmit={e => e.preventDefault()}>
            {!isLogin && (
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input type="text" className="form-input" placeholder="First name" required />
                <input type="text" className="form-input" placeholder="Last name" required />
              </div>
            )}
            <input type="email" className="form-input mb-3" placeholder="Email address" required style={{ width: '100%' }} />
            <input type="password" className="form-input mb-4" placeholder="Password" required style={{ width: '100%' }} />
            
            {isLogin && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <a href="#" style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--sand)' }}>
            <p className="body-md" style={{ color: 'var(--stone)' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                style={{ color: 'var(--near-black)', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
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
