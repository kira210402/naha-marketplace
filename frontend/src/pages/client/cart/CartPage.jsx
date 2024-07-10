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

          const cartResponse = await getCartItems(userInfo.id);
          setCartItems(cartResponse.products);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch])

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

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping Fee:</span>
                {/* <span>${shippingFee}</span> */}
              </div>
              <div className="flex justify-between mb-4 font-bold">
                <span>Order Total:</span>
                {/* <span>${totalPrice + shippingFee}</span> */}
                <span>${totalPrice}</span>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded">Proceed to Checkout</button>
              <button className="w-full bg-gray-500 text-white py-2 rounded mt-2">
                <Link to={'/'}>Add More Products</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;