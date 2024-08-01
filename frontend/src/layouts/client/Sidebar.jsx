import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

const Sidebar = () => {
  const menuItems = [
    { key: '1', label: 'Tea' },
    { key: '2', label: 'Clothes' },
    { key: '3', label: 'Food' },
  ];

  return (
    <Sider width={200} className='site-layout-background'>
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        className='h-full border-r-0'
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
