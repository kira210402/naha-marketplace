import { useState } from 'react';
import {
  DashboardOutlined,
  DatabaseOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme, Typography } from 'antd';
import ProductManagementPage from './ProductManagementPage';
import CollectionManagementPage from './CollectionManagementPage';
import SettingStorePage from './SettingStorePage';
import DashBoardPage from './DashBoardPage';
import { useNavigate } from 'react-router-dom';
import OrdersManagementPage from './OrdersManagementPage';
const { Header, Sider, Content } = Layout;

const MyStoreDetailPage = ({ store }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const navigate = useNavigate();

  const { Text } = Typography;

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <DashBoardPage />;
      case '2':
        return <OrdersManagementPage />;
      case '3':
        return <ProductManagementPage />;
      case '4':
        return <CollectionManagementPage />;
      case '5':
        return <SettingStorePage />;
      default:
        return <div>Content</div>;
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            if (key === '0') {
              navigate('/');
            } else {
              setSelectedMenuItem(key);
            }
          }}
          items={[
            {
              key: '0',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'DashBoard',
            },
            {
              key: '2',
              icon: <UnorderedListOutlined />,
              label: 'Orders',
            },
            {
              key: '3',
              icon: <ProductOutlined />,
              label: 'Products',
            },
            {
              key: '4',
              icon: <DatabaseOutlined />,
              label: 'Collections',
            },
            {
              key: '5',
              icon: <SettingOutlined />,
              label: 'Settings',
            },
          ]}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              size='small'
              src={store.avatar}
              icon={!store.avatar && <UserOutlined />}
            />
            <Text style={{ marginLeft: 8 }}>{store.name}</Text>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyStoreDetailPage;
