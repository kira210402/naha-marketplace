import { TruckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { changeStatusOrderItem } from '../../../services/stores';

const DeliveryRecord = (props) => {
  const { data, onReload } = props;
  const cartItemId = data.id;

  const handleDelivery = async () => {
    try {
      const status = 'Delivering';
      const response = await changeStatusOrderItem(cartItemId, status);
      if (response.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Order Accepted',
          text: 'The order has been successfully accepted.',
          timer: 2000,
          showConfirmButton: false,
        });
        onReload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error accepting the order. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error accepting the order. Please try again.',
      });
      console.log(error);
    }
  };
  return (
    <>
      <Button
        title='Delivery'
        icon={<TruckOutlined />}
        style={{ color: '#1677ff' }}
        size='small'
        type='text'
        onClick={handleDelivery}
      />
    </>
  );
};

export default DeliveryRecord;
