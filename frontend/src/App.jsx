import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');

  const validate = () => {
    let valid = true;
    setEmailErr('');
    setPassErr('');
    setErr('');

    if (!email.trim()) {
      setEmailErr('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErr('Invalid email format');
      valid = false;
    }

    if (!pass) {
      setPassErr('Password is required');
      valid = false;
    } else if (pass.length < 6) {
      setPassErr('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: pass })
    })
      .then((res) => {
        return res.json().then((data) => ({ status: res.status, data }));
      })
      .then(({ status, data }) => {
        setLoading(false);
        if (status === 200) {
          setUser({ email });
          setErr('');
        } else {
          setErr(data.msg || 'Login failed');
        }
      })
      .catch(() => {
        setLoading(false);
        setErr('Unable to connect to backend server');
      });
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPass('');
    setErr('');
    setEmailErr('');
    setPassErr('');
  };

  if (user) {
    return (
      <div className="app-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <div>
              <div className="brand-header" style={{ marginBottom: 8 }}>
                <div className="brand-icon">♪</div>
                <div className="brand-name">Melodia</div>
              </div>
              <h1 className="welcome-title" style={{ textAlign: 'left', marginBottom: 4 }}>
                Welcome to Melodia
              </h1>
              <span className="user-badge">{user.email}</span>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="dash-section">
            <h2 className="section-title">Recently Played</h2>
            <div className="grid-cards">
              <div className="music-card">
                <div className="card-img-placeholder">♫</div>
                <div className="card-title">Midnight Beats</div>
                <div className="card-sub">Playlist • Melodia Originals</div>
              </div>
              <div className="music-card">
                <div className="card-img-placeholder">▶</div>
                <div className="card-title">Chill Vibes</div>
                <div className="card-sub">Playlist • Daily Mix</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="login-card">
        <div className="brand-header">
          <div className="brand-icon">♪</div>
          <div className="brand-name">Melodia</div>
        </div>

        <h2 className="welcome-title">Welcome back</h2>

        {err && <div className="error-banner">{err}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="text"
              className={`text-input ${emailErr ? 'has-error' : ''}`}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailErr && <span className="field-error">{emailErr}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className={`text-input ${passErr ? 'has-error' : ''}`}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {passErr && <span className="field-error">{passErr}</span>}
          </div>

          <div className="options-row">
            <label className="remember-label">
              <input
                type="checkbox"
                className="remember-checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="mock-buttons">
          <button type="button" className="btn-mock">
            <span>Continue with Google</span>
          </button>
          <button type="button" className="btn-mock">
            <span>Continue with phone</span>
          </button>
        </div>

        <div className="signup-prompt">
          Don't have an account?
          <span className="signup-link">Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default App;
