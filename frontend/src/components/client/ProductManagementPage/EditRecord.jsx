import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Space,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import { editProduct } from '../../../services/products';

const EditRecord = (props) => {
  const { onReload, data } = props;
  const { TextArea } = Input;
  const [showModal, setShowModal] = useState(false);

  const [form] = Form.useForm();
  const rules = [
    {
      required: true,
      message: 'Trường này là bắt buộc !',
    },
  ];
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
    setFileList([]);
  };
  const [fileList, setFileList] = useState([]);
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    if (showModal) {
      const initialFileList = data.images.map((image, index) => ({
        uid: index,
        name: `image-${index}`,
        status: 'done',
        url: image,
      }));
      setFileList(initialFileList);
    }
  }, [showModal, data]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('discount', values.discount);
      formData.append('quantity', values.quantity);
      formData.append('description', values.description);

      if (fileList.length > 0) {
        fileList.forEach((file) => {
          if (!file.url) {
            formData.append('images', file.originFileObj);
          }
        });
      }

      const response = await editProduct(data.id, formData);
      if (response.code === 200) {
        message.success('Successfully edited the product');
        onReload();
        setShowModal(false);
        return response;
      } else message.error('Edit failed');
    } catch (error) {
      message.warning('An error occurred');
    }
  };
  return (
    <>
      <Button
        title='edit'
        icon={<EditOutlined />}
        size='small'
        type='text'
        onClick={handleShowModal}
      />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Thêm mới sản phẩm'
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
          initialValues={data}
        >
          <Form.Item label='Tên sản phẩm' name='name' rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label='Số lượng' name='quantity' rules={rules}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Giá' name='price' rules={rules}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Discount' name='discount' rules={rules}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Images'>
            <Upload
              listType='picture'
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item label='Mô tả' name='description'>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right', width: '100%' }}>
              <Button onClick={handleCancel} className='bg-meta-6'>
                Hủy
              </Button>
              <Button htmlType='submit' className='bg-secondary'>
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditRecord;
