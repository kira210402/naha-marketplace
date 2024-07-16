import { Button } from 'antd';
import { deleteCollection } from '../../../services/collections';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteRecord = ({ collection, onReload }) => {
  const handleDelete = async () => {
    await deleteCollection(collection.id);
    onReload();
  }

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

export default DeleteRecord;