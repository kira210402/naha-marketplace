import { useCallback, useEffect, useState } from 'react';
import { getProductsOfStore } from '../../../services/stores';
import { Flex, Space, Spin, Table, message } from 'antd';
import CreateRecord from './CreateRecord';
import DeleteRecord from './DeleteRecord';
import ViewRecord from './ViewRecord';
import EditRecord from './EditRecord';

const DataTable = (props) => {
  const { tab } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    limitPage: 5,
    totalPage: 1,
    currentPage: 1,
    totalResult: 1,
  });

  const fetchData = useCallback(
    async (options = {}, filter = {}) => {
      try {
        switch (tab) {
          case '2':
            filter['status'] = 'active';
            break;
          case '3':
            filter['status'] = 'inactive';
            break;
          default:
            break;
        }
        const rawData = await getProductsOfStore(
          {
            limit: options.limit || pagination.limitPage,
            page: options.page || pagination.currentPage,
          },
          filter,
        );

        setProducts(rawData.products?.data || []);
        setPagination({
          limitPage: rawData.products?.meta.perPage,
          totalPage: rawData.products?.meta.lastPage,
          currentPage: rawData.products?.meta.currentPage,
          totalResult: rawData.products?.meta.total,
        });
        setLoading(false);
      } catch (error) {
        message.error('Có lỗi xảy ra!');
      }
    },
    [tab, pagination.limitPage, pagination.currentPage],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReload = () => {
    fetchData();
  };

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
  };

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
      title: <div style={{ fontSize: '1rem' }}>Hình ảnh</div>,
      dataIndex: 'images',
      width: 100,
      key: 'images',
      render: (text, record) => (
        <img
          src={record.images[0]}
          alt='image'
          style={{ width: 50, height: 50 }}
        />
      ),
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Tên sản phẩm</div>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Số lượng</div>,
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => parseInt(a.quantity, 10) - parseInt(b.quantity, 10),
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Giá</div>,
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
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
          <div style={{ fontSize: '1rem' }}>
            {status ? 'active' : 'inactive'}
          </div>
        );
      },
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Hành động</div>,
      key: 'actions',
      width: 120,
      render: (_, record) => {
        return (
          <>
            <ViewRecord data={record} />
            <EditRecord data={record} onReload={handleReload} />
            <DeleteRecord data={record} onReload={handleReload} />
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
          dataSource={products}
          columns={columns}
          rowKey={'id'}
          size='small'
          pagination={{
            current: pagination.currentPage,
            pageSize: pagination.limitPage,
            total: pagination.totalResult,
            onChange: (page, pageSize) => {
              setPagination((prevPagination) => ({
                ...prevPagination,
                currentPage: page,
                limitPage: pageSize,
              }));
              const option = {};
              const filter = {};
              option['limit'] = pageSize;
              option['page'] = page;
              fetchData(option, filter);
            },
            pageSizeOptions: ['5', '10', '20', '30', '50'],
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
