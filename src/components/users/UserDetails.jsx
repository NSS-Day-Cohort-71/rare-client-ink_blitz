import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserDetails = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
};
