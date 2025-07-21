import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Task from './pages/Task';
import Summary from './pages/Summary';
import Report from './pages/Report';
import WorkBot from './pages/WorkBot';
import Login from './pages/Login';
import Register from './pages/Register';
import { getCurrentUser } from './services/authService';

const App = () => {
  const currentUser = getCurrentUser();

  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />

        {/* Rute Terlindungi */}
        <Route 
          path="/*"
          element={
            currentUser ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/task" element={<Task />} />
                  <Route path="/summary" element={<Summary />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/workbot" element={<WorkBot />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
