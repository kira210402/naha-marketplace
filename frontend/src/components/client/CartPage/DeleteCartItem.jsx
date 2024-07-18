import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { deleteCartItem } from '../../../services/cart';
const DeleteCartItem = (props) => {
  const { onReload, data } = props;
  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Muốn hủy sản phẩm này trong giỏ hàng!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hủy',
      cancelButtonText: 'Không',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteCartItem(data.id);
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
export default DeleteCartItem;
