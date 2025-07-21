import React, { useEffect, useState } from 'react';
import {
  getData,
  setData,
  addItem,
  updateItem,
  deleteItem
} from '../services/storageService';
import '../index.css';

const TASK_KEY = 'task_list';
const defaultTasks = [
  {
    id: 1,
    task: 'Review dokumen tender',
    due: '2024-06-10',
    status: 'Belum Selesai',
  },
];

function TaskForm({ onSave, onCancel, initial }) {
  const [form, setForm] = useState(
    initial || { task: '', due: '', status: 'Belum Selesai' }
  );
  return (
    <form className="crud-form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <input required placeholder="Task" value={form.task} onChange={e => setForm(f => ({ ...f, task: e.target.value }))} />
      <input required type="date" value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} />
      <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
        <option>Belum Selesai</option>
        <option>Selesai</option>
      </select>
      <div className="form-actions">
        <button type="submit">Simpan</button>
        <button type="button" onClick={onCancel}>Batal</button>
      </div>
    </form>
  );
}

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    if (!getData(TASK_KEY).length) setData(TASK_KEY, defaultTasks);
    setTasks(getData(TASK_KEY));
  }, []);

  const refresh = () => {
    setTasks(getData(TASK_KEY));
  };

  const handleAddTask = data => {
    addItem(TASK_KEY, { ...data, id: Date.now() });
    setShowTaskForm(false);
    refresh();
  };
  const handleEditTask = data => {
    updateItem(TASK_KEY, editTask.id, data);
    setEditTask(null);
    setShowTaskForm(false);
    refresh();
  };
  const handleDeleteTask = id => {
    deleteItem(TASK_KEY, id);
    refresh();
  };

  return (
    <div className="calendar-container">
      <h2 className="section-title">Task List</h2>
      <div className="calendar-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="sub-title">Task</h3>
            <button className="add-btn" onClick={() => { setShowTaskForm(true); setEditTask(null); }}>+ Tambah</button>
          </div>
          {showTaskForm && (
            <TaskForm
              onSave={editTask ? handleEditTask : handleAddTask}
              onCancel={() => { setShowTaskForm(false); setEditTask(null); }}
              initial={editTask}
            />
          )}
          <div className="card-list">
            {tasks.length === 0 && <div className="empty">Tidak ada tugas.</div>}
            {tasks.map(task => (
              <div className={`task-card card ${task.status === 'Selesai' ? 'done' : ''}`} key={task.id} style={{ margin: 0 }}>
                <div className="card-title">{task.task}</div>
                <div className="card-deadline">Deadline: {task.due}</div>
                <div className="card-status">Status: <span>{task.status}</span></div>
                <div className="crud-actions">
                  <button onClick={() => { setEditTask(task); setShowTaskForm(true); }}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="danger">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task; 