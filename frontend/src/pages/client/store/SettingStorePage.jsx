import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import SettingStore from './SettingStore';
import { getMyStore } from '../../../services/stores';

const SettingStorePage = () => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getMyStore();
        setStore(response.store);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch store:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
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
  return <div>{store ? <SettingStore store={store} /> : <p>No store data</p>}</div>;
};

export default SettingStorePage;
