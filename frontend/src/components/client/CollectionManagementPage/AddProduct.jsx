import {
  Avatar,
  Button,
  Form,
  Input,
  List,
  message,
  Modal,
  Space,
} from 'antd';

import { useState } from 'react';
import { addProduct, getCollectionById } from '../../../services/collections';
import { ProductFilled } from '@ant-design/icons';

export default function AddProduct(props) {
  const { onReload, collection, storeProducts } = props;
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(storeProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedProducts, setAddedProducts] = useState(collection.products);


  const fetchCollection = async () => {
    const response = await getCollectionById(collection.id);
    if (response.code === 200) {
      setAddedProducts(response.collection.products);
    }
  };
  
  const handleFormReload = () => {
    fetchCollection();
  };

  // functional for search product
  const isProductInFiltered = (product) => {
    return addedProducts.some(item => item.id === product.id);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setDisplayedProducts(displayedProducts.filter(product => product.name.toLowerCase().includes(value)));
  };

  const handleShowModal = () => {
    handleFormReload();
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const productIds = addedProducts.filter(product => !collection.products.some(item => item.id === product.id)).map(product => product.id);
      const response = await addProduct(collection.id, { productIds });
      if (response.code === 200) {
        message.success('Update collection success!');
        onReload();
        setShowModal(false);
        form.resetFields();
        return response;
      } else message.error('update collection fail');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  const handleClick = (product) => {
    setAddedProducts([...addedProducts, product]);
  }

  return (
    <>
      <Button htmlType='submit' onClick={handleShowModal}>
        + Thêm sản phẩm
      </Button>
      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Thêm mới Collection'
        footer={null}
      >
        <Form
          name='create'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label='Search'>
            <Input placeholder="Search product" value={searchTerm} onChange={handleSearch} />
          </Form.Item>

          <List
            itemLayout="horizontal"
            dataSource={storeProducts}
            renderItem={product => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    key="1"
                    style={{ fontWeight: product.status ? 'bold' : 'normal' }}
                    disabled={isProductInFiltered(product)}
                    onClick={() => handleClick(product)}
                  >
                    +
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar
                    size='small'
                    src={product.images[0]}
                    icon={!product.images[0] && <ProductFilled />}
                  />}
                  title={product.name}
                  description={`Quantity: ${product.quantity}, Price: $${product.price}, Discount: ${product.discount}%`}
                />
              </List.Item>
            )}
          />

          <Form.Item>
            <Space style={{ float: 'right', width: '100%' }}>
              <Button onClick={handleCancel} className='bg-meta-6'>
                Hủy
              </Button>
              <Button htmlType='submit' className='bg-secondary'>
                Lưu
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
