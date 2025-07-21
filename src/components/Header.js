import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchInternal } from '../services/searchService';
import { getCurrentUser, logoutUser } from '../services/authService';

const navStyle = {
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#2a5d9f',
  fontWeight: 500,
  fontSize: '1rem',
  padding: '6px 14px',
  borderRadius: '6px',
  transition: 'background 0.2s, color 0.2s',
};

const activeStyle = {
  background: '#eaf1fb',
  color: '#17406a',
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      const results = await searchInternal(searchQuery);
      setSearchResults(results);
    };

    fetchResults();
  }, [searchQuery]);
  
  // Reset search saat pindah halaman
  useEffect(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, [location]);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/login'; // Menggunakan reload untuk memastikan state di-reset
  };

  const handleResultClick = (item) => {
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank');
    } else {
      navigate(item.link);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <header style={{ padding: '1.2rem 2rem', backgroundColor: '#fff', borderBottom: '1px solid #e5eaf1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(42,93,159,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <img src="/agit-logo.png" alt="AGIT Logo" style={{ height: '40px', width: 'auto' }} />
        <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#2a5d9f', letterSpacing: '-1px' }}>
          WorkMate
        </span>
      </div>

      {/* Search Bar */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Cari dokumen, kontak, tools..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        {isSearchFocused && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(item => (
              <div key={item.id} className="search-result-item" onClick={() => handleResultClick(item)}>
                <span className="result-type">{item.type}</span>
                <span className="result-title">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav style={navStyle}>
        <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }}>Dashboard</Link>
        <Link to="/calendar" style={{ ...linkStyle, ...(location.pathname === '/calendar' ? activeStyle : {}) }}>Kalender</Link>
        <Link to="/task" style={{ ...linkStyle, ...(location.pathname === '/task' ? activeStyle : {}) }}>Task</Link>
        <Link to="/summary" style={{ ...linkStyle, ...(location.pathname === '/summary' ? activeStyle : {}) }}>Summary</Link>
        <Link to="/report" style={{ ...linkStyle, ...(location.pathname === '/report' ? activeStyle : {}) }}>Laporan</Link>
        <Link to="/workbot" style={{ ...linkStyle, ...(location.pathname === '/workbot' ? activeStyle : {}) }}>Work Assistant</Link>
        {user && (
          <div className="user-menu">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 