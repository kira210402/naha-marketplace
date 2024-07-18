import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getProduct } from './../../../services/products/index';
import { addProductToCart } from '../../../services/cart';
import { toast } from 'react-toastify';
import { getStore } from '../../../services/stores';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState(null);
  const [amount, setAmount] = useState(1);
  const [store, setStore] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.product);
      setImages(response.product.images);
      if (response.product.images !== null) {
        setActiveImg(response.product.images[0]);
      } else {
        setActiveImg('')
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  const fetchStore = async (id) => {
    const response = await getStore(id);
    setStore(response.store)
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.storeId) {
      fetchStore(product.storeId)
    }
  }, [product])

  const handleAddToCart = async () => {
    try {
      const quantity = amount;
      const response = await addProductToCart(product.id, quantity);
      if (response) {
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart!');
      }
    } catch (error) {
      toast.error('An error occurred while adding the product to cart.');
    }
  };

  return (
    <div className='mx-auto max-w-7xl bg-slate-50 p-8'>
      {product && (
        <>
          <div className='flex flex-col justify-between gap-16 pb-3 lg:flex-row lg:items-start'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
              <img
                src={activeImg}
                alt=''
                className='aspect-square h-full w-full rounded-xl object-cover'
              />
              <div className='flex h-24 flex-row justify-between'>
                {images && images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=''
                    className='h-24 w-24 cursor-pointer rounded-md'
                    onClick={() => setActiveImg(img)}
                  />
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4 lg:w-2/4'>
              <div>
                <span className='font-semibold'>{product.name}</span>
                <h1 className='text-3xl font-bold'>{product.name}</h1>
              </div>

              <h6 className='text-2xl font-semibold'>
                New price: $ {(product.price * (100 - product.discount)) / 100}
              </h6>
              <div className='flex'>
                <span className='text-2xl font-semibold text-gray-400'>
                  Old price:
                </span>
                <h6 className='mx-2 text-2xl font-semibold text-gray-400 line-through'>
                  $ {product.price}
                </h6>
              </div>

              <h6 className='text-2xl font-semibold'>
                Discount: - {product.discount} %
              </h6>
              <div className='flex flex-row items-center gap-12'>
                <div className='flex flex-row items-center'>
                  <button
                    className='rounded-lg bg-gray-200 px-5 pb-2 pt-1 text-3xl text-violet-800'
                    onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className='rounded-lg px-6 py-4'>{amount}</span>
                  <button
                    className='rounded-lg bg-gray-200 px-4 pb-2 pt-1 text-3xl text-violet-800'
                    onClick={() =>
                      setAmount((prev) => Math.min(product.quantity, prev + 1))
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className='h-full rounded-xl bg-violet-800 px-16 py-3 font-semibold text-white'
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          {/* store */}
          {store && (
            <>
              <NavLink to={`/stores/${store.id}`}>
                <div className='mt-8 flex items-start gap-4 rounded-lg bg-white p-4 shadow-md'>
                  <img
                    src={store.avatar}
                    alt={store.name}
                    className='h-24 w-24 rounded-full object-cover'
                  />
                  <div>
                    <h2 className='text-xl font-bold'>{store.name}</h2>
                    <p>Number of products: {store.products.length}</p>
                  </div>
                </div>
              </NavLink>
              <div className='mt-4'>
                <div><b>Description</b>: {product.description}</div>
                <div><b>Stock</b>: {product.quantity}</div>
                <div><b>Sent from</b>: {store.address}</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
