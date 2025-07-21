import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../services/storageService';
import { FaTasks, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [assistantQuery, setAssistantQuery] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [activitySummary, setActivitySummary] = useState({ completed: 0, meetings: 0 });

  useEffect(() => {
    // Ambil Jadwal Mendatang
    const allEvents = getData('calendar_events');
    const sortedEvents = allEvents
      .filter(event => new Date(event.start) > new Date())
      .sort((a, b) => new Date(a.start) - new Date(b.start));
    setUpcomingEvents(sortedEvents.slice(0, 3));

    // Ambil Prioritas Tugas
    const allTasks = getData('task_list');
    const incompleteTasks = allTasks
      .filter(task => task.status === 'Belum Selesai')
      .sort((a, b) => new Date(a.due) - new Date(b.due));
    setPriorityTasks(incompleteTasks.slice(0, 3));

    // Ringkasan Aktivitas
    const today = new Date().toISOString().slice(0, 10);
    const completedToday = allTasks.filter(t => t.status === 'Selesai' && t.due === today).length;
    const meetingsToday = allEvents.filter(e => new Date(e.start).toISOString().slice(0, 10) === today).length;
    setActivitySummary({ completed: completedToday, meetings: meetingsToday });

  }, []);

  const handleAssistantSubmit = (e) => {
    if (e.key === 'Enter' && assistantQuery.trim()) {
      navigate('/workbot', { state: { query: assistantQuery } });
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
  };

  return (
    <div className="dashboard-container">
      {/* Assistant Prompt */}
      <div className="assistant-prompt-section">
        <h3 className="assistant-prompt-title">Selamat datang kembali! Ada yang bisa saya bantu hari ini?</h3>
        <input
          type="text"
          className="assistant-prompt-input"
          placeholder="Ask anything..."
          value={assistantQuery}
          onChange={(e) => setAssistantQuery(e.target.value)}
          onKeyDown={handleAssistantSubmit}
        />
      </div>

      <div className="dashboard-grid-new">
        {/* Prioritas Tugas */}
        <div className="card">
          <h3 className="sub-title"><FaTasks /> Prioritas Hari Ini</h3>
          <div className="card-content">
            {priorityTasks.length > 0 ? priorityTasks.map(task => (
              <div key={task.id} className="item-row">
                <span>{task.task}</span>
                <span className="item-due">{formatDate(task.due)}</span>
              </div>
            )) : <p className="empty">Tidak ada tugas mendesak.</p>}
          </div>
        </div>

        {/* Jadwal Mendatang */}
        <div className="card">
          <h3 className="sub-title"><FaCalendarAlt /> Jadwal Mendatang</h3>
          <div className="card-content">
            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
              <div key={event.id} className="item-row">
                <span>{event.title}</span>
                <span className="item-due">{formatDate(event.start)}</span>
              </div>
            )) : <p className="empty">Tidak ada jadwal mendatang.</p>}
          </div>
        </div>

        {/* Ringkasan Aktivitas */}
        <div className="card">
          <h3 className="sub-title"><FaChartBar /> Aktivitas Hari Ini</h3>
          <div className="card-content">
            <div className="item-row">
              <span>Tugas Selesai</span>
              <span className="item-count">{activitySummary.completed}</span>
            </div>
            <div className="item-row">
              <span>Total Meeting</span>
              <span className="item-count">{activitySummary.meetings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 