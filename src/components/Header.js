import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchInternal } from '../services/searchService';
import { getCurrentUser, logoutUser } from '../services/authService';
import { FiExternalLink, FiChevronDown } from 'react-icons/fi';

const navStyle = {
  display: 'flex',
  gap: '2.2rem',
  alignItems: 'center',
  fontSize: '1.15rem',
  fontWeight: 500,
};

const linkStyle = {
  textDecoration: 'none',
  color: '#2a5d9f',
  fontWeight: 500,
  fontSize: '1.08rem',
  padding: '8px 18px',
  borderRadius: '10px',
  transition: 'background 0.18s, color 0.18s',
  display: 'inline-block',
  position: 'relative',
};

const activeStyle = {
  background: '#eaf1fb',
  color: '#17406a',
  fontWeight: 700,
};

const iserveStyle = {
  color: '#b3125c',
  fontWeight: 700,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdown = () => setDropdownOpen((v) => !v);
  const closeDropdown = () => setDropdownOpen(false);

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

  useEffect(() => {
    // Tutup dropdown saat pindah halaman
    closeDropdown();
    // eslint-disable-next-line
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
    <header className="main-header">
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
      <nav style={navStyle} className="main-nav">
        <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }}>Dashboard</Link>
        <Link to="/workbot" style={{ ...linkStyle, ...(location.pathname === '/workbot' ? activeStyle : {}) }}>Work Assistant</Link>
        <div className="dropdown" onMouseLeave={closeDropdown}>
          <button className="dropdown-btn" onClick={handleDropdown} aria-haspopup="true" aria-expanded={dropdownOpen}>
            Menu <FiChevronDown style={{ marginLeft: 4 }} />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/calendar" className="dropdown-item" onClick={closeDropdown}>Kalender</Link>
              <Link to="/task" className="dropdown-item" onClick={closeDropdown}>Task</Link>
              <Link to="/summary" className="dropdown-item" onClick={closeDropdown}>Summary</Link>
              <Link to="/report" className="dropdown-item" onClick={closeDropdown}>Laporan</Link>
            </div>
          )}
        </div>
        <a href="https://iserveu.ag-it.com" target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, ...iserveStyle }}>
          iServe <FiExternalLink size={16} style={{ marginBottom: '-2px' }} />
        </a>
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