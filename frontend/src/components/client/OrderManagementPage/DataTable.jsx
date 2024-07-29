import { useCallback, useEffect, useState } from 'react';
import { getListOrderFromStore } from '../../../services/stores';
import { Flex, Spin, Table } from 'antd';
import ViewRecord from './ViewRecord';
import EditRecord from './EditRecord';
import DeleteRecord from './DeleteRecord';
import AcceptRecord from './AcceptRecord';
import DeliveryRecord from './DeliveryRecord';

const DataTable = (props) => {
  const { tab } = props;
  const [listOrders, setListOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('listOrders', listOrders);
  const fetchData = useCallback(async () => {
    try {
      const data = await getListOrderFromStore();
      setListOrders(data.orderItem);
      setLoading(false);
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }, [tab]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleReload = () => {
    fetchData();
  };

  const columns = [
    {
      title: <div style={{ fontSize: '0.9rem' }}>STT</div>,
      dataIndex: 'index',
      key: 'index',
      width: 60,
      sorter: (a, b) => a.index - b.index,
      render: (_, __, index) => (
        <div style={{ fontSize: '1rem' }}>{index + 1}</div>
      ),
    },
    {
      title: <div style={{ fontSize: '1rem' }}>ID</div>,
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Receiver Name</div>,
      dataIndex: 'receiverName',
      key: 'receiverName',
      sorter: (a, b) =>
        a.order.receiverName.localeCompare(b.order.receiverName),
      render: (_, record) => {
        return (
          <>
            <div style={{ fontSize: '1rem' }}>{record.order.receiverName}</div>
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Phone Number</div>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.order.phoneNumber.localeCompare(b.order.phoneNumber),
      render: (_, record) => {
        return (
          <>
            <div style={{ fontSize: '1rem' }}>{record.order.phoneNumber}</div>
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Quantity</div>,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (_, record) => {
        return (
          <>
            <div style={{ fontSize: '1rem' }}>{record.quantity}</div>
          </>
        );
      },
      ellipsis: true,
    },

    {
      title: <div style={{ fontSize: '1rem' }}>Total Price</div>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 110,
      sorter: (a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice),
      render: (text) => <div>$ {parseFloat(text).toFixed(2)}</div>,
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Payment</div>,
      dataIndex: 'payment',
      key: 'payment',
      width: 110,
      sorter: (a, b) => a.payment.localeCompare(b.payment),
      ellipsis: true,
      render: (_, record) => {
        const paymentMethod = record.order.payment;
        return (
          <>
            <div style={{ fontSize: '1rem' }}>
              {paymentMethod ? 'Cash' : 'VNPAY'}
            </div>
          </>
        );
      },
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Status</div>,
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      render: (text, record) => {
        return <div style={{ fontSize: '1rem' }}>{record.status}</div>;
      },
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Actions</div>,
      key: 'actions',
      width: 120,
      render: (_, record) => {
        return (
          <>
            <ViewRecord data={record} />
            <EditRecord data={record} onReload={handleReload} />
            <DeleteRecord data={record} onReload={handleReload} />
            <AcceptRecord data={record} onReload={handleReload} />
            <DeliveryRecord />
          </>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Flex
        gap='small'
        vertical
        align='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Spin size='large' />
      </Flex>
    );
  }
  return (
    <>
      <div>
        {/* <Space
          style={{
            marginBottom: 16,
          }}
        >
          <CreateRecord onReload={handleReload} />
        </Space> */}

        <Table
          dataSource={listOrders}
          columns={columns}
          rowKey={'id'}
          size='small'
          // pagination={{
          //   current: pagination.currentPage,
          //   pageSize: pagination.limitPage,
          //   total: pagination.totalResult,
          //   onChange: (page, pageSize) => {
          //     setPagination((prevPagination) => ({
          //       ...prevPagination,
          //       currentPage: page,
          //       limitPage: pageSize,
          //     }));
          //     const option = {};
          //     const filter = {};
          //     option['limit'] = pageSize;
          //     option['page'] = page;
          //     fetchData(option, filter);
          //   },
          //   pageSizeOptions: ['5', '10', '20', '30', '50'],
          //   position: ['bottomRight'],
          //   hideOnSinglePage: false,
          //   showSizeChanger: true,
          //   showPrevNextJumpers: false,
          //   showLessItems: true,
          //   showTotal: (total) =>
          //     handleTotal(total, [
          //       pagination.currentPage,
          //       pagination.limitPage,
          //     ]),
          //}}
        />
      </div>
    </>
  );
};

export default DataTable;
