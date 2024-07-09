import ProductList from '../../components/client/storePage/productList/ProductList';
import {useEffect, useState} from 'react';
import { getListProduct } from '../../services/products';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getListProduct();
      console.log(response)
      setProducts(response.products.data);
    };
    fetchProducts();
  })
  
  return (
    <div>
      <ProductList products={products} />
    </div>
  )
};

export default HomePage;
