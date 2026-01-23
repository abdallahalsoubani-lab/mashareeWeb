import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Masharee from './Masharee.jsx'
import Login from './Login.jsx'
import './index.css'

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center">
        <div className="text-[#d4b94c] text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return user ? (
    <Masharee user={user} onLogout={handleLogout} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
