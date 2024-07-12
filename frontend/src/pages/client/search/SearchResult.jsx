import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchProduct } from '../../../services/products';
import ProductCard from '../../../components/client/productCard/ProductCard';

const SearchResult = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSearchProduct(location.search);
        setSearchResults(result.products.data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className='mx-auto max-w-2xl bg-white py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        Kết quả tìm kiếm
      </h2>
      <div className='grid grid-cols-3 gap-4'>
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
