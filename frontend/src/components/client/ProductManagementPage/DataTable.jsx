import { useEffect, useState } from 'react';
import { getProductsOfStore } from '../../../services/stores';
import { Space, Table } from 'antd';

const DataTable = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getProductsOfStore();
      setProducts(data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log('products', products);

  // const handleReload = () => {
  //   fetchData();
  // };

  const columns = [
    {
      title: <div style={{ fontSize: '0.9rem' }}>STT</div>,
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, record, index) => (
        <div style={{ fontSize: '1rem' }}>{index + 1}</div>
      ),
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Tên sản phẩm</div>,
      dataIndex: 'hình ảnh',
      key: 'hình ảnh',
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Tên sản phẩm</div>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Số lượng</div>,
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => parseInt(a.quantity, 10) - parseInt(b.quantity, 10),
      // sortOrder: sortedInfo.columnKey === 'experience' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Giá</div>,
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
      // sortOrder: sortedInfo.columnKey === 'experience' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Status</div>,
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },

    // {
    //   title: <div style={{ fontSize: '1rem' }}>Hành động</div>,
    //   key: 'actions',
    //   width: 120,
    //   render: (_, record) => {
    //     return (
    //       <>
    //         <ViewRecord record={record} departments={departments} />
    //         <EditRecord
    //           record={record}
    //           onReload={handleReload}
    //           departments={departments}
    //         />
    //         <DeleteRecord record={record} onReload={handleReload} />
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <>
      <div>
        <Space
          style={{
            marginBottom: 16,
          }}
        >
          {/* <CreateRecord
            onReload={handleReload}
          ></CreateRecord> */}
          {/* <Button onClick={clearFilters}>Xóa bộ lọc</Button>
          <Button onClick={clearAll}>Xóa bộ lọc và sắp xếp</Button> */}
        </Space>

        <Table
          // onChange={handleChange}
          // dataSource={products}
          columns={columns}
          rowKey={'id'}
          size='small'
          // pagination={{
          //   current: pagination.current,
          //   total: pagination.totalResult,
          //   onChange: (page, pageSize) => {
          //     setPagination((prevPagination) => ({
          //       ...prevPagination,
          //       current: page,
          //       limitPage: pageSize,
          //     }));
          //     const option = {};
          //     const filter = {};
          //     option['limit'] = pageSize;
          //     option['page'] = page;
          //     fetchData(option, filter);
          //   },
          //   pageSizeOptions: ['10', '30', '50'],
          //   position: ['bottomRight'],
          //   hideOnSinglePage: false,
          //   showSizeChanger: true,
          //   showPrevNextJumpers: false,
          //   showLessItems: true,
          //   showTotal: () =>
          //     handleTotal(pagination.totalResult, [
          //       pagination.current,
          //       pagination.limitPage,
          //     ]),
          // }}
        />
      </div>
    </>
  );
};
export default DataTable;
