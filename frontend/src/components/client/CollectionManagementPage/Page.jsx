import { message, Tabs } from 'antd';
const { TabPane } = Tabs;
import DataTable from './DataTable';
import BreadCrumb from '../Breadcrumb/Breadcrumb';
import { getAllCollections } from '../../../services/collections';
import { useEffect, useState } from 'react';
import CollectionDetailTable from './CollectionDetailTable';
import { getProductsOfStore } from '../../../services/stores';

const Page = () => {
  const [collections, setCollections] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAllCollections();
      setCollections(data.result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchStoreProducts = async () => {
    try {
      const response = await getProductsOfStore();
      if (response.code === 200) {
        setStoreProducts(response.allProducts);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  useEffect(() => {
    fetchData();
    fetchStoreProducts();
  }, []);

  const handleReload = () => {
    fetchData();
    fetchStoreProducts();
  }

  return (
    <div>
      <BreadCrumb
        link='/products-management'
        title_1='Quản trị hệ thống'
        title_2='Quản lý collection'

      />
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Tất cả' key='1'>
          <DataTable data={collections} handleReload={handleReload}/>
        </TabPane>
        {collections.map((collection) => (
          <TabPane tab={collection.name} key={collection.id}>
            <CollectionDetailTable collection={collection} storeProducts={storeProducts}/>
          </TabPane>
        ))
        }
      </Tabs>
    </div>
  );
};
export default Page;
