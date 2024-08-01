import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const { Content } = Layout;

const LayoutDefault = () => {
  return (
    <Layout className='min-h-screen'>
      <Header />
        <Layout className='px-6 pb-16'>
          <Content className='p-6'>
            <Outlet />
          </Content>
        </Layout>
      <Footer />
    </Layout>
  );
};

export default LayoutDefault;
