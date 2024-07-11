import ProductList from '../../components/client/storePage/productList/ProductList';
import { useEffect, useState } from 'react';
import { getListProduct } from '../../services/products';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getListProduct();
        setProducts(response.products.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Optional: Add a loading indicator
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default HomePage;
