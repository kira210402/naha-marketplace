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
          <DataTable />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Page;
