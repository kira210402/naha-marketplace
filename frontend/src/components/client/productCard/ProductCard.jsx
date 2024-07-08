import { useEffect, useState } from 'react';
import { getListProduct } from '../../../services/products';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getListProduct();
      console.log(response)
      setProducts(response.products.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {products && (
        <ul className='m-5 flex'>
          {products.map((item) => (
            <>
              <div className='m-3 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
                {item.images ? (
                  <a href='#'>
                    <img
                      className='rounded-t-lg p-8'
                      src={item.images[0]}
                      alt='product image'
                    />
                  </a>
                ) : (
                  <a href='#'>
                    <img
                      className='rounded-t-lg p-8'
                      src={
                        'https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg'
                      }
                      alt='product image'
                    />
                  </a>
                )}
                <div className='px-5 pb-5'>
                  <a href='#'>
                    <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                      {item.name}
                    </h5>
                  </a>

                  <div className='flex items-center justify-between'>
                    <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                      ${item.price}
                    </span>
                    <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                      -{item.discount}%
                    </span>
                    <a
                      href='#'
                      className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductCard;
