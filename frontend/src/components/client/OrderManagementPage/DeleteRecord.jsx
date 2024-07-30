import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { cancelOrderItem } from '../../../services/stores';

const DeleteRecord = ({ data, onReload }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Muốn hủy đơn hàng này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await cancelOrderItem(data.id);
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
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the order item.',
            icon: 'error',
          });
          console.error('Error deleting order item:', error);
        }
      }
    });
  };

  return (
    <Button
      title='Cancel'
      icon={<CloseCircleOutlined />}
      danger
      size='small'
      type='text'
      onClick={handleDelete}
    />
  );
};

export default DeleteRecord;
