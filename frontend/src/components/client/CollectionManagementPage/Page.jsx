import { Tabs } from 'antd';
const { TabPane } = Tabs;
import DataTable from './DataTable';
import BreadCrumb from '../Breadcrumb/Breadcrumb';
import { getAllCollections } from '../../../services/collections';
import { useEffect, useState } from 'react';
import CollectionDetailTable from './CollectionDetailTable';

const Page = () => {
  const [collections, setCollections] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAllCollections();
      setCollections(data.result);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BreadCrumb
        link='/products-management'
        title_1='Quản trị hệ thống'
        title_2='Quản lý collection'

      />
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Tất cả' key='1'>
          <DataTable collections={collections} />
        </TabPane>
        {collections.map((collection) => (
          <TabPane tab={collection.name} key={collection.id}>
            <CollectionDetailTable collection={collection} />
          </TabPane>
        ))
        }
      </Tabs>
    </div>
  );
};
export default Page;
