// Layanan AI untuk simulasi pembuatan ringkasan
export const getSummary = (transcript) => {
  console.log("Meminta ringkasan untuk transkrip:", transcript);

  // Simulasi panggilan API dengan delay 2 detik
  return new Promise(resolve => {
    setTimeout(() => {
      // Data ringkasan tiruan (mock)
      const mockSummary = {
        points: [
          "Diskusi mengenai progres kuartal 3.",
          "Angka penjualan menunjukkan tren positif, naik 15% dari kuartal sebelumnya.",
          "Marketing campaign 'AGITNext' berhasil meningkatkan brand awareness."
        ],
        actions: [
          "Tim Sales akan menyiapkan laporan detail performa per produk sebelum hari Jumat.",
          "Tim Marketing akan menyusun rencana untuk kampanye kuartal 4.",
          "PIC Project X akan memberikan update teknis pada rapat berikutnya."
        ],
        decisions: [
          "Anggaran untuk kampanye kuartal 4 disetujui.",
          "Timeline untuk Project Y diperpanjang 2 minggu."
        ]
      };
      console.log("Ringkasan berhasil dibuat (mock):", mockSummary);
      resolve(mockSummary);
    }, 2000);
  });
}; 