import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../services/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProduct(id);
      setProduct(response.product);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      {product && (
        <section className='body-font overflow-hidden bg-white text-gray-700'>
          <div className='container mx-auto px-5 py-24'>
            <div className='mx-auto flex flex-wrap lg:w-4/5'>
              <img
                alt='ecommerce'
                className='w-full rounded border border-gray-200 object-cover object-center lg:w-1/2'
                src={product.images[0]}
              />
              <div className='mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10'>
                <h1 className='title-font mb-1 text-3xl font-medium text-gray-900'>
                  {product.name}
                </h1>
                <div className='mb-4 flex'></div>
                <p className='leading-relaxed'>{product.description}</p>

                <div className='flex'>
                  <span className='title-font text-2xl font-medium text-gray-900'>
                    ${product.price}
                  </span>
                  <span className='title-font text-2xl font-medium text-gray-900'>
                    -{product.discount}%
                  </span>
                  <button className='ml-auto flex rounded border-0 bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none'>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetailPage;
