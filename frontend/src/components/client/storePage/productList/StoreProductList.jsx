import { useState } from 'react';
import ProductCard from '../../productCard/ProductCard';
import { Pagination } from 'flowbite-react';

const StoreProductList = ({ products }) => {
  const productsPerPage = 20;
  const productsCount = products.length;
  const totalPage = Math.ceil(productsCount / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {currentProducts.length !== 0 ?
          currentProducts.map(product => {
            return (
              <div key={product.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                <ProductCard product={product} />
              </div>
            );
          }) :
          <div>This collection has 0 product</div>
        }
      </div>

      {/* pagination */}
      {productsCount !== 0 ?
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="navigation"
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
        : <div></div>
      }
    </>
  );
}

export default StoreProductList;
