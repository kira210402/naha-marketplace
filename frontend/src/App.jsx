import { BrowserRouter as Router } from "react-router-dom";
import AllRouter from "./components/client/AllRouter";

function App() {
  return (
    <>
      <Router>
        <AllRouter />
      </Router>
    </>
  );
}

export default App;
