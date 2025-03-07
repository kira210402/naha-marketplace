import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AddProduct from './AddProduct';
import RemoveProduct from './RemoveProduct';
import { getCollectionById } from '../../../services/collections';

const CollectionDetailTable = ({ collection, storeProducts }) => {
  const totalResult = collection.products.length;
  const [products, setProducts] = useState(collection.products);
  const [updatedCollection, setUpdatedCollection] = useState(collection);
  const [pagination, setPagination] = useState({
    limitPage: 5,
    totalPage: 1,
    currentPage: 1,
    totalResult: 1,
  });

  const fetchData = async () => {
    try {
      const response = await getCollectionById(collection.id);
      setProducts(response.collection.products);
      setUpdatedCollection(response.collection);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collection.id])

  const onReload = () => {
    fetchData();
  }

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
      title: <div style={{ fontSize: '1rem' }}>Hình ảnh</div>,
      dataIndex: 'images',
      width: 100,
      key: 'images',
      render: (_, record) => (
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
      ellipsis: true,
      render: (text, record) => <NavLink to={`/products/${record.id}`}>{text}</NavLink>
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
      title: <div style={{ fontSize: '1rem' }}>Discount</div>,
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a, b) => parseInt(a.discount, 10) - parseInt(b.discount, 10),
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

    {
      title: <div style={{ fontSize: '1rem' }}>Hành động</div>,
      key: 'actions',
      width: 120,
      render: (_, record) => {
        return (
          <>
            <RemoveProduct product={record} onReload={onReload} collection={collection}/>
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
          <AddProduct onReload={onReload} collection={updatedCollection} storeProducts={storeProducts} />
        </Space>

        <Table
          columns={columns}
          rowKey={'id'}
          size='small'
          dataSource={products}
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
              setProducts(collection.products.slice((page - 1) * pageSize, page * pageSize));
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
export default CollectionDetailTable;
