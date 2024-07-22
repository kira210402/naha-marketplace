import { Outlet } from 'react-router-dom';
import Footer from '../../components/client/footer/Footer';
import Header from './Header';
import AddressInput from '../../components/client/Address/AddressInput';
const LayoutDefault = () => {
  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <header
          className='sticky top-0 bg-white shadow'
          style={{ zIndex: 100 }}
        >
          <Header />
        </header>
        <main className='container mx-auto flex min-h-screen flex-col'>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>

        <div>
          <AddressInput />
        </div>
      </div>
    </>
  );
};

export default LayoutDefault;
