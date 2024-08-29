import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../managers/UserManager';

export const UserDetails = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const getAndSetUser = async () => {
    const userData = await getUserById(userId);
    setUser(userData);
  };

  useEffect(() => {
    getAndSetUser();
  }, [userId]);

  return (
    <div key={user.id}>
      <h1>User Profile</h1>
      <div>
        Name: {user.first_name} {user.last_name}
        <div>
          {user.profile_image_url ? (
            <img src={user.profile_image_url} />
          ) : (
            <img src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" />
          )}
        </div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>
          Creation Date: <HumanDate date={user.created_on} />{' '}
        </div>
      </div>
    </div>
  );
};
