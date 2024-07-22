import ProductList from '../../components/client/homepage/ProductList';
import { useEffect, useState } from 'react';
import { getListProduct } from '../../services/products';
import { Flex, Spin } from 'antd';
import Slider from '../../components/client/Slider';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getListProduct();
        setProducts(response.products.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Flex
        gap='small'
        vertical
        align='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Spin size='large' />
      </Flex>
    );
  }

  return (
    <>
      <div>
        <Slider />
      </div>
      <div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default HomePage;
