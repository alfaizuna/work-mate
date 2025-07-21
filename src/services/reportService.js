import { getData } from './storageService';

const TASK_KEY = 'task_list';

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDailyReport = () => {
  return new Promise(resolve => {
    // 1. Ambil tugas yang selesai hari ini
    const allTasks = getData(TASK_KEY);
    const todayString = getTodayDateString();
    const completedToday = allTasks.filter(task => 
      task.status === 'Selesai' && task.due === todayString
    );

    // 2. Simulasi data lainnya
    const reportData = {
      completedTasks: completedToday,
      activeHours: {
        focus: 4.5,
        meetings: 2,
        other: 1.5,
      },
      suggestions: [
        "Anda memiliki banyak meeting hari ini. Coba alokasikan 'waktu fokus' di kalender besok.",
        "Pekerjaan bagus! Anda telah menyelesaikan beberapa tugas penting.",
        "Jangan lupa istirahat sejenak setiap 90 menit untuk menjaga energi.",
      ]
    };
    
    setTimeout(() => {
      resolve(reportData);
    }, 500); // Simulasi delay
  });
}; 