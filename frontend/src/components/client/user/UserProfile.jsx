import { useEffect, useState } from 'react';
import fetchUserInfo from '../../../services/user';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const data = await fetchUserInfo();
      if (data) {
        setUserInfo(data);
      }
    }

    getUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.name}</h1>
      <p>Email: {userInfo.email}</p>
    </div>
  );
};

export default UserProfile;
