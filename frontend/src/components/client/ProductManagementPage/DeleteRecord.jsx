import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { deleteProduct } from '../../../services/products';
import Swal from 'sweetalert2';
const DeleteRecord = (props) => {
  const { onReload, data } = props;
  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Muốn xóa sản phẩm này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteProduct(data.id);
        console.log(response);
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
        title='Xóa'
        icon={<DeleteOutlined />}
        danger
        size='small'
        type='text'
        onClick={handleDelete}
      />
    </>
  );
};
export default DeleteRecord;
