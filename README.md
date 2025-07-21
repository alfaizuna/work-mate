# AGIT WorkMate - Personal Digital Assistant

![AGIT Logo](public/agit-logo.png)

AGIT WorkMate adalah aplikasi web internal yang berfungsi sebagai "rekan kerja digital" untuk setiap karyawan di AGIT. Proyek ini bertujuan untuk meningkatkan produktivitas harian dengan menyediakan asisten AI yang membantu dalam manajemen waktu, otomatisasi tugas, pencarian informasi, dan mendukung kerja hybrid.

## ✨ Fitur Utama

Aplikasi ini mencakup beberapa fitur utama yang dirancang untuk membantu produktivitas Anda:

*   **🔐 Otentikasi Pengguna**: Sistem pendaftaran dan login yang aman untuk menjaga data Anda tetap personal.
*   **📊 Dashboard Interaktif**:
    *   **Work Assistant Prompt**: Langsung ajukan pertanyaan dari dashboard.
    *   **Prioritas & Jadwal**: Lihat tugas mendesak dan jadwal mendatang dalam satu tampilan.
    *   **Ringkasan Aktivitas**: Pantau jumlah tugas selesai dan meeting harian.
*   **🗓️ Kalender Cerdas**:
    *   Kelola jadwal meeting dan acara Anda dengan fitur CRUD (Create, Read, Update, Delete).
    *   Tampilan kalender visual dengan penanda untuk tanggal yang memiliki acara.
*   **✅ Manajemen Tugas**:
    *   Atur daftar tugas pribadi dan pekerjaan Anda.
    *   Lengkapi dengan fitur CRUD dan status penyelesaian.
*   **🧠 AI Summary Generator (Simulasi)**:
    *   Tempelkan transkrip rapat dan dapatkan ringkasan poin-poin penting, tindak lanjut, dan keputusan secara otomatis.
*   **🔍 Quick Search Internal (Simulasi)**:
    *   Cari dokumen, kontak, atau tools internal dari satu search bar universal di header.
*   **🔔 Smart Reminder**:
    *   Dapatkan notifikasi otomatis untuk acara yang akan datang atau tugas yang mendekati deadline.
*   **📈 Daily Focus Report**:
    *   Lihat laporan harian mengenai tugas yang selesai, estimasi waktu kerja, dan dapatkan saran efisiensi.
*   **🤖 Chat Assistant (Work Assistant)**:
    *   Tanyakan berbagai hal terkait pekerjaan, seperti PIC proyek atau deadline, dan dapatkan jawaban instan.

## 🛠️ Teknologi yang Digunakan

*   **Frontend**: React.js
*   **Routing**: React Router
*   **Styling**: CSS Murni (dengan pendekatan modern)
*   **State Management**: React Hooks (useState, useEffect)
*   **Penyimpanan Lokal**: `localStorage` dan `sessionStorage` untuk simulasi database dan sesi.
*   **Library Pendukung**:
    *   `react-icons` untuk ikon.
    *   `react-calendar` untuk tampilan kalender.
    *   `react-toastify` untuk notifikasi.
    *   `sweetalert2` untuk alert interaktif.

## 🚀 Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone git@github.com:alfaizuna/work-mate.git
    cd work-mate
    ```

2.  **Install semua dependency:**
    ```bash
    npm install
    ```

3.  **Jalankan aplikasi:**
    ```bash
    npm start
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

## 🔮 Rencana Pengembangan

*   Integrasi backend dengan database (misalnya, PostgreSQL, MongoDB).
*   Menghubungkan fitur ke API sesungguhnya:
    *   **Microsoft Graph API** untuk Kalender dan Kontak.
    *   **Jira/Asana API** untuk Task List.
    *   **OpenAI GPT-4o API** atau **Azure AI Services** untuk Summary Generator dan Work Assistant.
    *   **ElasticSearch/Algolia** untuk Quick Search.
*   Meningkatkan keamanan otentikasi dengan JWT (JSON Web Tokens).

---
Dibuat dengan ❤️ untuk inovasi di AGIT.
