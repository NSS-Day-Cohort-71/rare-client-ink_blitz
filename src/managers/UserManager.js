export const getAllUsers = async () => {
  const response = await fetch('http://localhost:8088/users');
  const users = await response.json();
  return users;
};
export const getUserById = async (userId) => {
  const response = await fetch(`http://localhost:8088/users/${userId}`);
  const user = await response.json();
  return user;
};
