import { Tabs, DatePicker } from 'antd';
import DataTable from './DataTable';
import BreadCrumb from '../Breadcrumb/Breadcrumb';
import moment from 'moment';
import { useState } from 'react';

const Page = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date, dateString, type) => {
    if (type === 'start') {
      setStartDate(dateString);
    } else if (type === 'end') {
      setEndDate(dateString);
    }
  };

  const items = [
    {
      key: '1',
      label: 'All',
      children: <DataTable tab='1' startDate={startDate} endDate={endDate} />,
    },
    {
      key: '2',
      label: 'Pending',
      children: <DataTable tab='2' startDate={startDate} endDate={endDate} />,
    },
    {
      key: '3',
      label: 'Processing',
      children: <DataTable tab='3' startDate={startDate} endDate={endDate} />,
    },
    {
      key: '4',
      label: 'Delivering',
      children: <DataTable tab='4' startDate={startDate} endDate={endDate} />,
    },
    {
      key: '5',
      label: 'Delivered',
      children: <DataTable tab='5' startDate={startDate} endDate={endDate} />,
    },
    {
      key: '6',
      label: 'Cancelled',
      children: <DataTable tab='6' startDate={startDate} endDate={endDate} />,
    },
  ];

  return (
    <div className='p-4'>
      <BreadCrumb
        link='/products-management'
        title_1='Quản trị hệ thống'
        title_2='Quản lý orders'
      />
      <div className='my-4'>
        <DatePicker
          placeholder='Start Date'
          onChange={(date, dateString) =>
            handleDateChange(date, dateString, 'start')
          }
          format='YYYY-MM-DD'
          value={startDate ? moment(startDate, 'YYYY-MM-DD') : null}
          className='mr-2'
        />
        <DatePicker
          placeholder='End Date'
          onChange={(date, dateString) =>
            handleDateChange(date, dateString, 'end')
          }
          format='YYYY-MM-DD'
          value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
          className='mr-2'
        />
      </div>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
};

export default Page;
