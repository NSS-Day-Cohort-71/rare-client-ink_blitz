import { useEffect, useState } from 'react';
import { getAllUsers } from '../../managers/UserManager';
import { Link } from 'react-router-dom';

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
      <div key={user.id}>
        <ul>
          <Link to={`/users/${user.id}`}>
            <li>
              Full name: {user.first_name} {user.last_name}
            </li>
            <li>Username: {user.username}</li>
          </Link>
        </ul>
      </div>
    );
  });
};
