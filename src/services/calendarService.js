// Mock data kalender dan task list

export const getCalendarEvents = () => [
  {
    id: 1,
    title: 'Meeting Tim Proyek A',
    start: '2024-06-10T09:00',
    end: '2024-06-10T10:00',
    location: 'Ruang Zoom',
  },
  {
    id: 2,
    title: 'Daily Standup',
    start: '2024-06-10T10:30',
    end: '2024-06-10T11:00',
    location: 'Microsoft Teams',
  },
];

export const getTaskList = () => [
  {
    id: 1,
    task: 'Review dokumen tender',
    due: '2024-06-10',
    status: 'Belum Selesai',
  },
  {
    id: 2,
    task: 'Update Jira ticket #123',
    due: '2024-06-11',
    status: 'Selesai',
  },
]; 