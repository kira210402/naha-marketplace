import { TruckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const DeliveryRecord = () => {
  return (
    <>
      <Button
        title='Delivery'
        icon={<TruckOutlined />}
        style={{ color: '#1677ff' }}
        size='small'
        type='text'
      />
    </>
  );
};

export default DeliveryRecord;
