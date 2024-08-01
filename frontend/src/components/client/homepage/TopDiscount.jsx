import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';
import { topDiscount } from '../../../services/products';

const TopDiscount = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const data = await topDiscount();
      setProducts(data?.products);
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
          Top Discount
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div key={product.id}>
              <NavLink to={`/products/${product.id}`}>
                <div className='aspect-w-1 aspect-h-1 group relative w-full overflow-hidden rounded-md bg-gray-200'>
                  <img
                    alt={product.name}
                    src={product.images[0]}
                    className='h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105'
                  />
                  <div className='absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {product.discount}% OFF
                  </div>
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                    <div className='p-4 text-center'>
                      <h2 className='text-lg font-bold text-white'>
                        {product.name}
                      </h2>
                      <p className='text-sm text-white'>{product.price}</p>
                    </div>
                  </div>
                </div>
              </NavLink>

              <div className='mt-4'>
                <NavLink to={`/products/${product.id}`}>
                  <h3 className='text-sm font-medium text-gray-700'>
                    {product.store.name}
                  </h3>
                </NavLink>
                <p className='mt-1 text-sm text-gray-500'>
                  <EnvironmentOutlined /> {product.store.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDiscount;
