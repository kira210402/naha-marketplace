import { Link } from 'react-router-dom';
import { addProductToCart } from '../../../services/cart';
import { toast } from 'react-toastify';
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
    <div key={product.id} className='group relative p-4'>
      <div className='aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80'>
        {product.images ? (
          <Link to={`/products/${product.id}`}>
            <img
              className='w-full object-cover object-center lg:h-full lg:w-full'
              src={product.images[0]}
              alt={product.name}
            />
          </Link>
        ) : (
          <Link to={`/products/${product.id}`}>
            <img
              className='h-full w-full object-cover object-center lg:h-full lg:w-full'
              src={
                'https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg'
              }
              alt='product image'
            />
          </Link>
        )}
      </div>
      <div className='mt-4'>
        <div className='flex justify-between'>
          <h3>{product.name}</h3>
          <p className='mt-1 text-sm text-gray-500'>- {product.discount} %</p>
        </div>
        <p className='text-sm font-medium text-gray-900'>{product.price} $</p>
      </div>
      <button
        className='flex-grow rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
