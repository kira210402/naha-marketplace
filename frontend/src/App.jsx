import { BrowserRouter as Router } from 'react-router-dom';
import AllRouter from './components/client/AllRouter';
import { Provider } from 'react-redux';
import store from './redux/store/store';
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AllRouter />
        </Router>
      </Provider>
    </>
  );
}

export default App;
