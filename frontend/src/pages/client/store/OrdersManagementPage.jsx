import { useEffect, useState } from 'react';
import { getListOrderFromStore } from '../../../services/stores';

const OrdersManagementPage = () => {
  const [listOrders, setListOrders] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getListOrderFromStore();
      console.log('data', data);

      setListOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('listOrders', listOrders);

  useEffect(() => {
    fetchData();
  }, []);

  return <></>;
};

export default OrdersManagementPage;
