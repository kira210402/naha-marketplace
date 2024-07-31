// import { Outlet } from 'react-router-dom';
// import Footer from '../../components/client/footer/Footer';
// import Header from './Header';
// const LayoutDefault = () => {
//   return (
//     <>
//       <div className='min-h-screen bg-gray-100'>
//         <header
//           className='sticky top-0 bg-white shadow'
//           style={{ zIndex: 100 }}
//         >
//           <Header />
//         </header>
//         <main className='container mx-auto flex min-h-screen flex-col'>
//           <Outlet />
//         </main>
//         <footer>
//           <Footer />
//         </footer>
//       </div>
//     </>
//   );
// };

// export default LayoutDefault;

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/client/footer/Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

const LayoutDefault = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px', minHeight: 280 }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default LayoutDefault;
