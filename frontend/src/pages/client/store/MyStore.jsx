import { useEffect, useState } from 'react';
import { getMyStore } from '../../../services/stores';
import StoreForm from '../../../components/client/storePage/storeForm/StoreForm';
import { Button, Flex, Spin } from 'antd';
import MyStoreDetailPage from './MyStoreDetailPage';
import { useNavigate } from 'react-router-dom';

const MyStore = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyStore();
        setStore(response.store);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  return (
    <>
      {store ? (
        store.status === true ? (
          <MyStoreDetailPage store={store} />
        ) : (
          <>
            <div>Wait for admin to verify</div>
            <Button type='primary'>
              <a href='/'>Back to homepage </a>

            </Button>
          </>
        )
      ) : (
        <StoreForm />
      )}
    </>
  );
};

export default MyStore;
