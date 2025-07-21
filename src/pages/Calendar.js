import React, { useEffect, useState } from 'react';
import CalendarView from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  getData,
  setData,
  addItem,
  updateItem,
  deleteItem
} from '../services/storageService';
import '../index.css';

const EVENT_KEY = 'calendar_events';
const defaultEvents = [
  {
    id: 1,
    title: 'Meeting Tim Proyek A',
    start: '2024-06-10T09:00',
    end: '2024-06-10T10:00',
    location: 'Ruang Zoom',
  },
];

function EventForm({ onSave, onCancel, initial, selectedDate }) {
  const [form, setForm] = useState(
    initial || {
      title: '',
      start: selectedDate
        ? new Date(selectedDate).toISOString().slice(0, 16)
        : '',
      end: selectedDate
        ? new Date(selectedDate).toISOString().slice(0, 16)
        : '',
      location: '',
    }
  );

  return (
    <form className="crud-form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <input required placeholder="Judul" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      <input required type="datetime-local" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} />
      <input required type="datetime-local" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} />
      <input required placeholder="Lokasi" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
      <div className="form-actions">
        <button type="submit">Simpan</button>
        <button type="button" onClick={onCancel}>Batal</button>
      </div>
    </form>
  );
}

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!getData(EVENT_KEY).length) setData(EVENT_KEY, defaultEvents);
    setEvents(getData(EVENT_KEY));
  }, []);

  const refresh = () => setEvents(getData(EVENT_KEY));

  const handleAddEvent = data => {
    addItem(EVENT_KEY, { ...data, id: Date.now() });
    setShowEventForm(false);
    setEditEvent(null);
    refresh();
  };
  const handleEditEvent = data => {
    updateItem(EVENT_KEY, editEvent.id, data);
    setEditEvent(null);
    setShowEventForm(false);
    refresh();
  };
  const handleDeleteEvent = id => {
    deleteItem(EVENT_KEY, id);
    refresh();
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

  const getLocalDateString = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const eventDates = new Set(
    events.map(event => getLocalDateString(event.start))
  );

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = getLocalDateString(date);
      if (eventDates.has(dateString)) {
        return 'day-with-event';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2 className="section-title">Kalender</h2>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <CalendarView
          onChange={setSelectedDate}
          value={selectedDate}
          locale="id-ID"
          tileClassName={getTileClassName}
        />
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="sub-title">Semua Jadwal</h3>
          <button className="add-btn" onClick={() => { setShowEventForm(true); setEditEvent(null); }}>+ Tambah</button>
        </div>
        {showEventForm && (
          <EventForm
            onSave={editEvent ? handleEditEvent : handleAddEvent}
            onCancel={() => { setShowEventForm(false); setEditEvent(null); }}
            initial={editEvent}
            selectedDate={selectedDate}
          />
        )}
        <div className="card-list">
          {sortedEvents.length === 0 && <div className="empty">Tidak ada event.</div>}
          {sortedEvents.map(event => (
            <div className="event-card card" key={event.id} style={{ margin: 0 }}>
              <div className="card-title">{event.title}</div>
              <div className="card-time">
                {new Date(event.start).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
              </div>
              <div className="card-location">{event.location}</div>
              <div className="crud-actions">
                <button onClick={() => { setEditEvent(event); setShowEventForm(true); }}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)} className="danger">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 