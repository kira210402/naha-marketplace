import { Tabs } from 'antd';
import DataTable from './DataTable';
import BreadCrumb from '../Breadcrumb/Breadcrumb';

const Page = () => {
  const items = [
    {
      key: '1',
      label: 'All',
      children: <DataTable tab='1' />,
    },
    {
      key: '2',
      label: 'Paid',
      children: <DataTable tab='2' />,
    },
    {
      key: '3',
      label: 'Unpaid',
      children: <DataTable tab='3' />,
    },
  ];

  return (
    <div>
      <BreadCrumb
        link='/products-management'
        title_1='Quản trị hệ thống'
        title_2='Quản lý orders'
      />
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
};

export default Page;
