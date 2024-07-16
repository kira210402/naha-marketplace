import { Space, Table, Tag } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import {NavLink} from 'react-router-dom';
// import CollectionDetailTable from './CollectionDetailTable';

const DataTable = ({collections}) => {
  // const navigate = useNavigate();

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
      title: <div style={{ fontSize: '1rem' }}>Tên collection</div>,
      dataIndex: 'name',
      key: 'hình ảnh',
      ellipsis: true,
      // render: (text, record) => <a onClick={() => navigate(`/collections/${record.id}`)}>{text}</a>
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Số lượng SP</div>,
      dataIndex: 'productCount',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Status</div>,
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      render: (text, record) => {
        const status = record.status;
        return (
          <Tag style={{ color: status === true ? 'green' : 'red' }}>
            {status === true ? 'Active' : 'Inactive'}
          </Tag>
        )
      }
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
        dataSource={collections}
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
