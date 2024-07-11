import { Link } from 'react-router-dom';
import { addProductToCart } from '../../../services/cart';
import toast from 'react-hot-toast';
// import './style.css';
const ProductCard = ({ product }) => {
  const productId = product.id;
  const handleAddToCart = async () => {
    try {
      const response = await addProductToCart(productId);
      if (response) {
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the product to cart.');
    }
  };

  return (
    <div className='product--item m-2 transform overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition duration-300 ease-in-out hover:scale-105 dark:border-gray-700 dark:bg-gray-800'>
      <div className='h-full w-full'>
        {product.images ? (
          <Link to={`/products/${product.id}`}>
            <img
              className='h-full w-full rounded-t-lg object-cover'
              src={product.images[0]}
              alt={product.name}
            />
          </Link>
        ) : (
          <Link to={`/products/${product.id}`}>
            <img
              className='h-auto w-full rounded-t-lg'
              src={
                'https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg'
              }
              alt='product image'
            />
          </Link>
        )}
      </div>
      <div className='flex flex-col justify-between px-5 py-4'>
        <div>
          <Link to={`/products/${product.id}`}>
            <h5 className='mb-2 text-xl font-semibold text-gray-900 transition duration-300 hover:text-blue-500 dark:text-white'>
              {product.name}
            </h5>
          </Link>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              ${product.price}
            </span>
            <span className='text-lg font-semibold text-gray-500 dark:text-gray-400'>
              -{product.discount}%
            </span>
          </div>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              ${product.price - product.price * (product.discount / 100)}
            </span>
          </div>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Còn: {product.quantity} sản phẩm
            </span>
          </div>
        </div>
        <button
          className='flex-grow rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
