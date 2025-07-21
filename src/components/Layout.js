import React, { useEffect } from 'react';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkReminders } from '../services/reminderService';

const Layout = ({ children }) => {
  useEffect(() => {
    // Jalankan pengecekan reminder setiap menit
    const intervalId = setInterval(() => {
      checkReminders();
    }, 60000); // 60 detik

    // Bersihkan interval saat komponen dilepas
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
      <ToastContainer position="bottom-right" autoClose={15000} hideProgressBar={false} />
    </div>
  );
};

export default Layout; 