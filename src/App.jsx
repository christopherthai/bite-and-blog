import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';

function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
