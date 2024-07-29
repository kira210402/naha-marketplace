import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const DeleteRecord = () => {
  // const { handleReload } = props;
  // console.log(handleReload);
  return (
    <>
      <Button
        title='Xóa'
        icon={<CloseCircleOutlined />}
        danger
        size='small'
        type='text'
        // onClick={handleDelete}
      />
    </>
  );
};

export default DeleteRecord;
