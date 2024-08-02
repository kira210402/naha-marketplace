import { SmileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { changeStatusOrderItem } from '../../../services/stores';

const DeliveredRecord = (props) => {
  const { data, onReload } = props;
  const cartItemId = data.id;

  const handleDelivered = async () => {
    try {
      const status = 'Delivered';
      const response = await changeStatusOrderItem(cartItemId, status);
      if (response.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Order Accepted',
          text: 'The order has been DELIVERED.',
          timer: 2000,
          showConfirmButton: false,
        });
        onReload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error when DELIVERED the order. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error when DELIVERED the order. Please try again.',
      });
      console.log(error);
    }
  };
  return (
    <>
      <Button
        title='Delivered'
        icon={<SmileOutlined />}
        style={{ color: '#ffff16' }}
        size='small'
        type='text'
        onClick={handleDelivered}
      />
    </>
  );
};

export default DeliveredRecord;
