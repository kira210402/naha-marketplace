import { Space, Table, Tag } from 'antd';
import DeleteRecord from './DeleteRecord';
import CreateRecord from './CreateRecord';
import EditRecord from './EditRecord';

const DataTable = ({collections, handleReload}) => {

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
            <EditRecord collection={record} onReload={handleReload}/>
            <DeleteRecord collection={record} onReload={handleReload}/>
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
      />
    </div>
  </>
);
};
export default DataTable;
