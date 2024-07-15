import { BrowserRouter as Router } from 'react-router-dom';
import AllRouter from './components/client/AllRouter';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AllRouter />
        </Router>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
