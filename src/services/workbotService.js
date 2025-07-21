// Service mock untuk WorkBot
export const askWorkBot = (question) => {
  // Simulasi respons AI
  return new Promise(resolve => {
    setTimeout(() => {
      let answer = '';
      if (question.toLowerCase().includes('pic project')) {
        answer = 'PIC Project X adalah Budi Santoso (budi.santoso@agit.com).';
      } else if (question.toLowerCase().includes('deadline tender')) {
        answer = 'Deadline tender A adalah 30 Juli 2024.';
      } else if (question.toLowerCase().includes('ringkaskan rapat')) {
        answer = 'Rapat kemarin membahas progres proyek, kendala teknis, dan rencana tindak lanjut.';
      } else {
        answer = 'Maaf, saya belum bisa menjawab pertanyaan tersebut. Silakan hubungi admin atau coba pertanyaan lain.';
      }
      resolve(answer);
    }, 1200);
  });
}; 