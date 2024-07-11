import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import { deleteAllCookies } from '../../helpers/cookie';
import { checkLogin } from './../../redux/actions/loginStatus';

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        deleteAllCookies();
        dispatch(checkLogin(false));
        navigate('/login');
      } catch (error) {
        console.log('error logout', error);
      } finally {
        setLoading(false);
        // window.location.reload();
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <Flex
        gap='small'
        direction='column'
        align='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Spin size='large' />
      </Flex>
    );
  }

  return null;
}

export default Logout;
