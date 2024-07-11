import { useEffect, useState } from 'react';
import { getCartItems } from '../../../services/cart';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../../services/user';
import { setUser } from '../../../redux/features/user';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          const userInfo = await getUser(decodedUser.id);
          dispatch(setUser(userInfo));

          const cartResponse = await getCartItems();

          setCartItems(cartResponse.products);

        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemoveItem = (id) => {

    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    ));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
      <div className='flex min-h-screen flex-col items-center bg-gray-100'>
        <div className='container mx-auto p-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='rounded bg-white p-4 shadow'>
              <h2 className='mb-4 text-xl font-bold'>Shopping Cart</h2>
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className='mb-4 flex items-center justify-between'
                >
                  <div>

                    <h3 className="text-lg">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">${item.product.price} x {item.quantity}</p>

                  </div>
                  <div className='flex items-center'>
                    <button

                      onClick={() => handleQuantityChange(item.product.id, -1)}
                      disabled={item.quantity <= 1}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, 1)}
                      className="bg-green-500 text-white px-2 py-1 rounded"

                    >
                      +
                    </button>
                    <button

                      onClick={() => handleRemoveItem(item.product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='rounded bg-white p-4 shadow'>
              <h2 className='mb-4 text-xl font-bold'>Order Summary</h2>
              <div className='mb-2 flex justify-between'>
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span>Shipping Fee:</span>
                {/* <span>${shippingFee}</span> */}
              </div>
              <div className='mb-4 flex justify-between font-bold'>
                <span>Order Total:</span>
                {/* <span>${totalPrice + shippingFee}</span> */}
                <span>${totalPrice}</span>
              </div>
              <button className='w-full rounded bg-blue-500 py-2 text-white'>
                Proceed to Checkout
              </button>
              <button className='mt-2 w-full rounded bg-gray-500 py-2 text-white'>
                <Link to={'/'}>Add More Products</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
