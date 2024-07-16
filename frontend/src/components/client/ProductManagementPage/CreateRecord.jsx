import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  // message,
  Modal,
  Space,
  Upload,
} from 'antd';
// import Swal from 'sweetalert2';

import { useState } from 'react';

export default function CreateRecord() {
  const { TextArea } = Input;
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  // const [messageApi, contextHolder] = message.useMessage();
  // const [newFileListAvatar, setNewFileListAvatar] = useState([]);
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
  };

  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // const handleSubmit = async (values) => {
  //   const formData = new FormData();
  //   for (const key in values) {
  //     if (values.hasOwnProperty(key) && values[key]) {
  //       const value = values[key];
  //       if (Array.isArray(value)) {
  //         value.forEach((val) => {
  //           formData.append(`${key}[]`, val);
  //         });
  //       } else {
  //         formData.append(key, value);
  //       }
  //     }
  //   }
  //   if (newFileListAvatar.length > 0) {
  //     formData.append('avatar', newFileListAvatar[0].originFileObj);
  //   }
  //   const response = await createRecord(formData);
  //   if (response.data?.code === 201) {
  //     Swal.fire({
  //       title: 'Thông báo!',
  //       text: response.data?.message,
  //       icon: 'success',
  //     });
  //     onReload();
  //     setShowModal(false);
  //     form.resetFields();
  //   } else {
  //     Swal.fire({
  //       title: 'Thông báo!',
  //       text: response.response?.data.message,
  //       icon: 'error',
  //     });
  //   }
  // };

  return (
    <>
      <Button htmlType='submit' onClick={handleShowModal}>
        + Thêm mới
      </Button>
      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Thêm mới sản phẩm'
        footer={null}
      >
        {/* {contextHolder} */}
        <Form
          name='create'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          form={form}
          // onFinish={handleSubmit}
        >
          <Form.Item label='Tên sản phẩm' name='name' rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label='Collections' name='collections' rules={rules}>
            {/* <Select>
              {departments?.map((department) => (
                <Select.Option key={department.id} value={department.id}>
                  {department ? department.name : 'Chưa xét khoa'}
                </Select.Option>
              ))}
            </Select> */}
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

          <Form.Item label='Mô tả' name='description'>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label='Images'>
            <Upload
              listType='picture'
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right', width: '100%' }}>
              <Button onClick={handleCancel} className='bg-meta-6'>
                Hủy
              </Button>
              <Button htmlType='submit' className='bg-secondary'>
                Tạo mới
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
