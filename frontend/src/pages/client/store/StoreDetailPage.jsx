import { useParams } from 'react-router-dom';
// import CategoryBar from '../../../components/client/storePage/categoryBar/CategoryBar';
import StoreHeader from '../../../components/client/storePage/storeHeader/StoreHeader';
import { useEffect, useState } from 'react';
import { getProductsOfStore, getStore } from '../../../services/stores';
import StoreProductList from '../../../components/client/storePage/productList/StoreProductList';
import CollectionNavBar from '../../../components/client/storePage/collectionNavBar/CollectionNavBar';
import { getCollectionById } from '../../../services/collections';

const StoreDetailPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const responseStore = await getStore(id);
      // const responseProducts = await getProductsOfStore();
      setStore(responseStore.store)
      setProducts(responseStore.store.products)
      setFilteredProducts(responseStore.store.products)
    };
    fetchData()
  }, [])

  const handleSelection = async (collectionId) => {
    if (collectionId === 'all') {
      setFilteredProducts(products)
    } else {
      const response = await getCollectionById(collectionId)
      setFilteredProducts(response.collection.products)
    }
  }

  return (
    <>
      {
        store && products ?
          <>
            <StoreHeader name={store.name} avatar={store.avatar} description={store.description} />
            <CollectionNavBar collections={store.collections} onSelectCollection={handleSelection} />
            <StoreProductList products={filteredProducts} />
          </>
          : <div>store not found</div>
      }
      {/* <CategoryBar categories={ } onSelectCategory={ } /> */}
    </>
  )
}

export default StoreDetailPage;