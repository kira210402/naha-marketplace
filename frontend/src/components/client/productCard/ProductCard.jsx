import { Link } from 'react-router-dom';
import { addProductToCart } from '../../../services/cart';

const ProductCard = ({ product }) => {
  const productId = product.id;
  const handleAddToCart = async () => {
    const response = await addProductToCart(productId);
    console.log(response);
    return response;
  };

  return (
    <>
      <div className='m-3 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
        {product.images ? (
          <Link to={`/products/${product.id}`}>
            <img
              className='rounded-t-lg p-8'
              src={product.images[0]}
              alt='product image'
            />
          </Link>
        ) : (
          <Link to={`/products/${product.id}`}>
            <img
              className='rounded-t-lg p-8'
              src={
                'https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg'
              }
              alt='product image'
            />
          </Link>
        )}
        <div className='px-5 pb-5'>
          <Link to={`/products/${product.id}`}>
            <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              {product.name}
            </h5>
          </Link>

          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold text-gray-900 dark:text-white'>
              ${product.price}
            </span>
            <span className='text-3xl font-bold text-gray-900 dark:text-white'>
              -{product.discount}%
            </span>
            <button
              className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
