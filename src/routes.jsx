import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AllBites from "./pages/AllBites.jsx";
import AddBite from "./pages/AddBite.jsx";
import ShowcaseBite from "./pages/ShowcaseBite.jsx"
import ErrorPage from "./pages/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/addbite", element: <AddBite /> },
      { path: "/allbites", element: <AllBites /> },
      { path: "/showcasebite/:id", element: <ShowcaseBite />},
      { path: "*", element: <ErrorPage /> } 
    ],
  },
];

export default routes;
