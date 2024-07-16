import { Tabs } from 'antd';
const { TabPane } = Tabs;
import DataTable from './DataTable';
import BreadCrumb from '../Breadcrumb/Breadcrumb';

const Page = () => {
  return (
    <div>
      <BreadCrumb
        link='/products-management'
        title_1='Quản trị hệ thống'
        title_2='Quản lý sản phẩm'
      />
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Tất cả' key='1'>
          <DataTable tab='1' />
        </TabPane>

        <TabPane tab='Hoạt động' key='2'>
          <DataTable tab='2' />
        </TabPane>

        <TabPane tab='Dừng hoạt động' key='3'>
          <DataTable tab='3' />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Page;
