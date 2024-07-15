import { useEffect, useState } from 'react';
import { getMyStore } from '../../../services/stores';
import StoreForm from '../../../components/client/storePage/storeForm/StoreForm';
import { Flex, Spin } from 'antd';

const MyStore = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyStore();
        setStore(response.store);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

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
      {
        store ?
          store.status === true ?
            <div>
              <h1>{store.name}</h1>
              <p>{store.description}</p>
            </div>
            :
            <div>Wait for admin to verify</div>
          :
          <StoreForm />



      }

    </>
  )
}

export default MyStore;