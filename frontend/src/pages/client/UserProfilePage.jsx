import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../helpers/cookie';
import { setUser } from '../../redux/features/user';
import { getUser } from './../../services/user/index';
import UserProfile from '../../components/client/user/UserProfile';
import { Flex, Spin } from 'antd';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          const userInfo = await getUser(decodedUser.id);
          dispatch(setUser(userInfo));
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  const user = data?.user;

  if (loading) {
    return (
      <Flex
        gap='small'
        vertical
        align='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Spin size='large' />
      </Flex>
    );
  }

  return <div>{user ? <UserProfile user={user} /> : <p>No user data</p>}</div>;
};

export default UserProfilePage;
