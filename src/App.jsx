import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import './index.css'

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
