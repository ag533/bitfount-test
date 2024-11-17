import React, { useState } from 'react';
import './RegisterFrom.css';

const RegisterForm: React.FC<{ onRegister: (token: string) => void; onToggleLogin: () => void }> = ({ onRegister, onToggleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data === 'string') {
          onRegister(data);
        } else {
          setError(data.message || 'Registration failed');
        }
      });
  };

  return (
    <div className="register-container">
      <h1>Create a new account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Already have an account?</p>
      <button className="login-button" onClick={onToggleLogin}>Login</button>
    </div>
  );
};

export default RegisterForm;