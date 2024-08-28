import { useEffect, useState } from 'react';
import { getAllUsers } from '../../managers/UserManager';

export const AllProfiles = () => {
  const [users, setUsers] = useState([]);

  const getAndSetUsers = async () => {
    const userArr = await getAllUsers();
    setUsers(userArr);
  };

  useEffect(() => {
    getAndSetUsers();
  }, []);

  return users.map((user) => {
    return (
      <div>
        <div>
          Full name: {user.first_name} {user.last_name}
        </div>
        <div>Username: {user.username}</div>
      </div>
    );
  });
};
