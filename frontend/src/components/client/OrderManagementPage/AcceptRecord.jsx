import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { acceptOrderItem } from '../../../services/stores';

const AcceptRecord = (props) => {
  const { data } = props;
  const cartItemId = data.id;

  const handleAccept = async () => {
    try {
      const status = 'Processing';
      const response = await acceptOrderItem(cartItemId, status);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        title='accept'
        icon={<CheckCircleOutlined />}
        style={{ color: '#52c41a' }}
        size='small'
        type='text'
        onClick={handleAccept}
      />
    </>
  );
};

export default AcceptRecord;
