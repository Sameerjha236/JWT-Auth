const db = [];

export const validateCredentials = (userData) => {
  return db.some((u) => u.name === userData.name);
};

export const createUser = (userData) => {
  db.push(userData);
  return userData;
};
