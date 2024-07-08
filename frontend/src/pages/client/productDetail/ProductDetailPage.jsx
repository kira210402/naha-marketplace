import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const env = import.meta.env

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${env.VITE_API_BASE_URL}/products/${id}`);
      console.log('response', response.data.product);
      setProduct(response.data.product);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      {product &&
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={product.images[0]} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                <div className="flex mb-4">
                </div>
                <p className="leading-relaxed">{product.description}</p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                  <span className="title-font font-medium text-2xl text-gray-900">-{product.discount}%</span>
                  <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default ProductDetailPage;