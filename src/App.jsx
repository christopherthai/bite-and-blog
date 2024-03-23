import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import AddBite from "./pages/AddBite.jsx";

function App() {
  return (
    <div>
      {/*<Header />*/}
      {/*<NavBar />*/}
     {/* <Outlet />*/}
     <AddBite/>
    </div>
  );
}

export default App;
