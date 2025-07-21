// Service untuk Otentikasi (simulasi dengan localStorage)

const USERS_KEY = 'workmate_users';
const SESSION_KEY = 'workmate_session';

// Fungsi untuk mendapatkan semua pengguna
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Fungsi untuk menyimpan semua pengguna
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Registrasi Pengguna Baru
export const registerUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      reject(new Error('Email sudah terdaftar.'));
      return;
    }

    const newUser = { id: Date.now(), email, password }; // Di dunia nyata, password harus di-hash
    users.push(newUser);
    saveUsers(users);
    resolve(newUser);
  });
};

// Login Pengguna
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      resolve(user);
    } else {
      reject(new Error('Email atau password salah.'));
    }
  });
};

// Logout Pengguna
export const logoutUser = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

// Mendapatkan Pengguna yang Sedang Login
export const getCurrentUser = () => {
  const user = sessionStorage.getItem(SESSION_KEY);
  return user ? JSON.parse(user) : null;
}; 