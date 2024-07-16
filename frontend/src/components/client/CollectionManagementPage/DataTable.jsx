import { Space, Table, Tag } from 'antd';
import DeleteRecord from './DeleteRecord';
import CreateRecord from './CreateRecord';
import EditRecord from './EditRecord';
import { useState } from 'react';

const DataTable = ({ data, handleReload }) => {
  const initialCollections = data.slice(0, 5)
  const [collections, setCollections] = useState(initialCollections);
  const totalResult = data.length
  const [pagination, setPagination] = useState({
    limitPage: 3,
    totalPage: 1,
    currentPage: 1,
    totalResult: 1,
  });

  const handleTotal = (total, range) => {
    const start = (range[0] - 1) * range[1] + 1;
    return (
      <span>
        Hiển thị từ&nbsp;
        <span style={{ fontWeight: 'bold' }}>{start}</span> đến&nbsp;
        <span style={{ fontWeight: 'bold' }}>
          {Math.min(range[1] * range[0], pagination.totalResult)}
        </span>
        &nbsp;trong tổng số&nbsp;
        <span style={{ fontWeight: 'bold' }}>{total}</span> bản ghi
      </span>
    );
  }

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
      render: (_, record) => {
        const status = record.status;
        return (
          <Tag style={{ color: status === true ? 'green' : 'red' }}>
            {status === true ? 'Active' : 'Inactive'}
          </Tag>
        )
      }
    },

    {
      title: <div style={{ fontSize: '1rem' }}>Hành động</div>,
      key: 'actions',
      width: 120,
      render: (_, record) => {
        return (
          <>
            <EditRecord collection={record} onReload={handleReload} />
            <DeleteRecord collection={record} onReload={handleReload} />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <Space
          style={{
            marginBottom: 16,
          }}
        >
          <CreateRecord onReload={handleReload} />
        </Space>

        <Table
          columns={columns}
          rowKey={'id'}
          size='small'
          dataSource={collections}
          pagination={{
            current: pagination.currentPage,
            pageSize: pagination.limitPage,
            total: totalResult,
            onChange: (page, pageSize) => {
              setPagination((prevPagination) => ({
                ...prevPagination,
                currentPage: page,
                limitPage: pageSize,
              }));
              const option = {};
              option['limit'] = pageSize;
              option['page'] = page;
              setCollections(data.slice((page - 1) * pageSize, page * pageSize));
            },
            pageSizeOptions: ['2', '5', '10', '20', '30', '50'],
            position: ['bottomRight'],
            hideOnSinglePage: false,
            showSizeChanger: true,
            showPrevNextJumpers: false,
            showLessItems: true,
            showTotal: (total) =>
              handleTotal(total, [
                pagination.currentPage,
                pagination.limitPage,
              ]),

          }}
        />
      </div>
    </>
  );
};
export default DataTable;
