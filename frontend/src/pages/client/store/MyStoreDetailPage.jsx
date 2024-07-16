import { useState } from 'react';
import {
  DashboardOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import ProductManagementPage from './ProductManagementPage';
import CollectionManagementPage from './CollectionManagementPage';
import SettingStorePage from './SettingStorePage';
import DashBoardPage from './DashBoardPage';
const { Header, Sider, Content } = Layout;

const MyStoreDetailPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '0':
        return <DashBoardPage />;
      case '1':
        return <ProductManagementPage />;
      case '2':
        return <CollectionManagementPage />;
      case '3':
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
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={({ key }) => setSelectedMenuItem(key)}
          items={[
            {
              key: '0',
              icon: <DashboardOutlined />,
              label: 'DashBoard',
            },
            {
              key: '1',
              icon: <ProductOutlined />,
              label: 'Products',
            },
            {
              key: '2',
              icon: <DatabaseOutlined />,
              label: 'Collections',
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'Settings',
            },
          ]}
        />
      </Sider>
      <Layout style={{minHeight: '100vh'}}>
        <Header
          style={{
            padding: 0,
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
