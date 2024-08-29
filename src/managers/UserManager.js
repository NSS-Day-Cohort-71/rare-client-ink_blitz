export const getAllUsers = async () => {
  const response = await fetch('http://localhost:8088/users');
  const users = await response.json();
  return users;
};
