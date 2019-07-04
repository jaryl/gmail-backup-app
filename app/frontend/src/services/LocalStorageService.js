const LocalStorageService = {
  set: (key, value) => localStorage.setItem(key, value),
  get: key => localStorage.getItem(key),
  clear: key => localStorage.setItem(key, null),
};

export default LocalStorageService;
