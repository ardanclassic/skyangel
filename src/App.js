import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from 'routes';

function App() {
  return (
    <Router>
      <MainRoutes />
      <div className="device">
        not available yet on mobile device. <br />
        Try in higher resolution like laptop, pc, etc.
      </div>
    </Router>
  );
}

export default App;
