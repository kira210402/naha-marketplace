import { Outlet } from 'react-router-dom';
import Footer from '../../components/client/footer/Footer';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
const LayoutDefault = () => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='min-h-screen bg-gray-100'>
        <header className='bg-white shadow'>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default LayoutDefault;
