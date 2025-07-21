// Layanan untuk simulasi Quick Search Internal

// Data tiruan untuk pencarian
const searchData = [
  { id: 1, type: 'Dokumen', title: 'SOP Pengajuan Cuti Tahunan', link: '/docs/sop-cuti' },
  { id: 2, type: 'Dokumen', title: 'Panduan Penggunaan VPN', link: '/docs/panduan-vpn' },
  { id: 3, type: 'Kontak', title: 'Budi (IT Support)', email: 'budi.it@agit.com' },
  { id: 4, type: 'Kontak', title: 'Siti (HRD)', email: 'siti.hrd@agit.com' },
  { id: 5, type: 'Tools', title: 'Jira', link: 'https://agit.atlassian.net' },
  { id: 6, type: 'Tools', title: 'Confluence', link: 'https://agit.atlassian.net/wiki' },
  { id: 7, type: 'Halaman', title: 'Kalender', link: '/calendar' },
  { id: 8, type: 'Halaman', title: 'Task List', link: '/task' },
];

export const searchInternal = (query) => {
  if (!query) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();

  return new Promise(resolve => {
    setTimeout(() => {
      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(lowerCaseQuery)
      );
      resolve(results);
    }, 300); // Simulasi delay jaringan
  });
}; 