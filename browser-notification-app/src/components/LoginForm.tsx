import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm: React.FC<{ onLogin: (token: string) => void; onToggleRegister: () => void }> = ({ onLogin, onToggleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          onLogin(data.token);
        } else {
          alert('Invalid username or password');
        }
      });
  };

  return (
    <div className="login-container">
      <h1>Welcome to the reminder app</h1>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>    
      <button className="register-button" onClick={onToggleRegister}>Register</button>
    </div>
  );
};

export default LoginForm;