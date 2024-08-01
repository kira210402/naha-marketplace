import { useEffect, useState } from 'react';
import { getListStores } from '../../../services/stores';
import { NavLink } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';
const ListStorePage = () => {
  const [stores, setListStores] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getListStores();
      setListStores(data?.stores?.data);
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          List Stores
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {stores.map((store) => (
            <div key={store.id} className='group relative'>
              <NavLink to={`/stores/${store.id}`}>
                <div className='aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80'>
                  <img
                    alt={store.name}
                    src={store.avatar}
                    className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                  />
                </div>
                <h2 className='font-semibold text-xl'>{store.name}</h2>
              </NavLink>
              <EnvironmentOutlined />
              <span>{store.address}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListStorePage;
