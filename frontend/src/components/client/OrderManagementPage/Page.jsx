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
      label: 'Pending',
      children: <DataTable tab='2' />,
    },
    {
      key: '3',
      label: 'Processing',
      children: <DataTable tab='3' />,
    },
    {
      key: '4',
      label: 'Delivering',
      children: <DataTable tab='4' />,
    },
    {
      key: '5',
      label: 'Delivered',
      children: <DataTable tab='5' />,
    },
    {
      key: '6',
      label: 'Cancelled',
      children: <DataTable tab='6' />,
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
