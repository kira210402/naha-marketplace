import ProductCard from '../../productCard/ProductCard';

const StoreProductList = ({ products }) => {

  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map(product => {
          return (
            <div key={product.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <ProductCard product={product} />
            </div>
          )
        })}
      </div>
    </>


  )
}

export default StoreProductList;