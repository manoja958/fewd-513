// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    { username: "ghinni", password: "1234" },
    { username: "admin", password: "admin123" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      alert("Login successful!");
      setUser(username);
      localStorage.setItem('loggedInUser', username);
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
  <div className="page-wrapper">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
);

};

export default Login;
//Dashboard.js
// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ user, logout }) => {
  return (
    <div className="dashboard">
      <h2>Welcome, {user}!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;

//App.js

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} logout={logout} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;

