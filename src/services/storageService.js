// Service untuk CRUD data di localStorage

export function getData(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function addItem(key, item) {
  const data = getData(key);
  data.push(item);
  setData(key, data);
}

export function updateItem(key, id, newItem) {
  let data = getData(key);
  data = data.map(item => item.id === id ? { ...item, ...newItem } : item);
  setData(key, data);
}

export function deleteItem(key, id) {
  let data = getData(key);
  data = data.filter(item => item.id !== id);
  setData(key, data);
} 