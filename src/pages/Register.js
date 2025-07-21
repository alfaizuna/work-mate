import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import Swal from 'sweetalert2';
import '../index.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(email, password);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Pendaftaran Anda berhasil. Silakan masuk.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2a5d9f'
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/agit-logo.png" alt="Logo" className="auth-logo" />
        <h2>Daftar Akun Baru</h2>
        <p>Buat akun untuk mulai menggunakan WorkMate.</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <button type="submit" className="auth-button">Daftar</button>
        </form>
        <div className="auth-switch">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 