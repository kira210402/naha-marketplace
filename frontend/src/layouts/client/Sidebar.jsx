import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

const Sidebar = () => {
  
  return (
    <>
      <Sider width={200} className='site-layout-background'>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          className='h-full border-r-0'
        >
          <Menu.Item key='1'>Tea</Menu.Item>
          <Menu.Item key='2'>Clothes</Menu.Item>
          <Menu.Item key='3'>Food</Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
