import { useParams } from 'react-router-dom';
// import CategoryBar from '../../../components/client/storePage/categoryBar/CategoryBar';
import ProductList from '../../../components/client/storePage/productList/ProductList';
import StoreHeader from '../../../components/client/storePage/storeHeader/StoreHeader';
import { useEffect, useState } from 'react';
import { getProductsOfStore, getStore } from '../../../services/stores';

const StoreDetailPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const responseStore = await getStore(id);
      const responseProducts = await getProductsOfStore(id);
      setStore( responseStore.store)
      setProducts( responseProducts.products)
    };
    fetchData()
  }, [id])

  return (
    <>
      {
        store && products ?
          <>
            <StoreHeader name={store.name} avatar={store.avatar} description={store.description} />
            <ProductList products={products} />
          </>
          : <div>store not found</div>
      }
      {/* <CategoryBar categories={ } onSelectCategory={ } /> */}
    </>
  )
}

export default StoreDetailPage;