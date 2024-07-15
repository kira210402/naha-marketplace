import { useEffect, useState } from 'react';
import { getMyStore } from '../../../services/stores';
import StoreForm from '../../../components/client/storePage/storeForm/StoreForm';

const MyStore = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyStore();
      setStore(response.store);
    }
    fetchData();
  }, [])

  return (
    <>
      {
        store === null ?
          <StoreForm />
          :
          store.status === true ?
            <div>
              <h1>{store.name}</h1>
              <p>{store.description}</p>
            </div>
            :
            <div>Wait for admin to verify</div>
      }

    </>
  )
}

export default MyStore;