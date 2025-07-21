import { toast } from 'react-toastify';
import { getData } from './storageService';

const EVENT_KEY = 'calendar_events';
const TASK_KEY = 'task_list';

// Menyimpan ID notifikasi yang sudah ditampilkan agar tidak duplikat
const notified = new Set();

export const checkReminders = () => {
  const now = new Date();
  
  // 1. Cek Jadwal Meeting
  const events = getData(EVENT_KEY);
  events.forEach(event => {
    const eventTime = new Date(event.start);
    const diffMinutes = (eventTime - now) / (1000 * 60);

    // Ingatkan 15 menit sebelum acara dimulai
    if (diffMinutes > 0 && diffMinutes <= 15) {
      const notifId = `event-${event.id}`;
      if (!notified.has(notifId)) {
        toast.info(`🔔 ACARA SEBENTAR LAGI: ${event.title} akan dimulai dalam ${Math.round(diffMinutes)} menit.`);
        notified.add(notifId);
      }
    }
  });

  // 2. Cek Deadline Tugas
  const tasks = getData(TASK_KEY);
  const todayString = now.toISOString().slice(0, 10);

  tasks.forEach(task => {
    // Ingatkan jika deadline hari ini dan belum selesai
    if (task.due === todayString && task.status === 'Belum Selesai') {
      const notifId = `task-${task.id}`;
      if (!notified.has(notifId)) {
        toast.warn(`⏰ DEADLINE HARI INI: Tugas "${task.task}" harus diselesaikan.`);
        notified.add(notifId);
      }
    }
  });
}; 