import React, { useState, useEffect } from 'react';
import { getDailyReport } from '../services/reportService';
import '../index.css';

// Komponen untuk visualisasi bar chart sederhana
const ActivityChart = ({ data }) => {
  const totalHours = data.focus + data.meetings + data.other;
  const focusPercent = (data.focus / totalHours) * 100;
  const meetingsPercent = (data.meetings / totalHours) * 100;
  const otherPercent = (data.other / totalHours) * 100;

  return (
    <div className="chart-container">
      <div className="chart-bar focus" style={{ width: `${focusPercent}%` }}>
        Fokus
      </div>
      <div className="chart-bar meetings" style={{ width: `${meetingsPercent}%` }}>
        Meeting
      </div>
      <div className="chart-bar other" style={{ width: `${otherPercent}%` }}>
        Lainnya
      </div>
    </div>
  );
};

const Report = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const data = await getDailyReport();
      setReport(data);
      setLoading(false);
    };
    fetchReport();
  }, []);

  if (loading) {
    return <div className="calendar-container">Memuat laporan...</div>;
  }

  return (
    <div className="report-container">
      <h2 className="section-title">Daily Focus Report</h2>
      
      <div className="report-grid">
        {/* Tugas Selesai Hari Ini */}
        <div className="card">
          <h3 className="sub-title">Tugas Selesai Hari Ini</h3>
          {report.completedTasks.length > 0 ? (
            <ul className="report-task-list">
              {report.completedTasks.map(task => (
                <li key={task.id}>{task.task}</li>
              ))}
            </ul>
          ) : (
            <p className="empty">Belum ada tugas yang selesai hari ini.</p>
          )}
        </div>

        {/* Waktu Kerja Aktif */}
        <div className="card">
          <h3 className="sub-title">Waktu Kerja Aktif (Estimasi)</h3>
          <ActivityChart data={report.activeHours} />
          <ul className="chart-legend">
            <li><span className="dot focus"></span>Fokus: {report.activeHours.focus} jam</li>
            <li><span className="dot meetings"></span>Meeting: {report.activeHours.meetings} jam</li>
            <li><span className="dot other"></span>Lainnya: {report.activeHours.other} jam</li>
          </ul>
        </div>
      </div>

      {/* Saran Efisiensi */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="sub-title">Saran Efisiensi Untuk Anda</h3>
        <ul className="suggestions-list">
          {report.suggestions.map((suggestion, index) => (
            <li key={index}>💡 {suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report; 