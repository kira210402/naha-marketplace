import axios from "axios";
import { useEffect, useState } from "react";
const env = import.meta.env;

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${env.VITE_API_BASE_URL}/products`);
      setProducts(response.data.products.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {products && (
        <ul className='flex m-5'>
          {products.map((item) => (
            <>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
                {
                  item.images
                    ? <a href="#">
                      <img className="p-8 rounded-t-lg" src={item.images[0]} alt="product image" />
                    </a>
                    : <a href="#">
                      <img className="p-8 rounded-t-lg" src={"https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg"} alt="product image" />
                    </a>
                }
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                  </a>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${item.price}
                    </span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      -{item.discount}%
                    </span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
}

export default ProductCard;