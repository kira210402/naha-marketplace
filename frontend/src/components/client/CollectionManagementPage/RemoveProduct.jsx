import { Button } from 'antd';
import { removeProduct } from '../../../services/collections';
import { DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const RemoveProduct = ({ product, collection, onReload }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Muốn xóa collection này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await removeProduct(collection.id, product.id);
        if (response?.code === 200) {
          Swal.fire({
            title: 'Thông báo',
            text: response?.message,
            icon: 'success',
          });
          onReload();
        } else {
          Swal.fire({
            title: 'Thông báo!',
            text: response?.message,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        danger
        size='small'
        type='text'
      />
    </>
  );
}

export default RemoveProduct;