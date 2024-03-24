import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AllBites from "./pages/AllBites.jsx";
import AddBite from "./pages/AddBite.jsx";
import ShowcaseBite from "./pages/ShowcaseBite.jsx"
import ErrorPage from "./pages/ErrorPage.jsx";

// Define the routes for the application
const routes = [
  {
    path: "/",
    element: <App />, // Render the App component for the root path
    children: [
      { path: "/", element: <Home /> }, // Render the Home component for the "/" path
      { path: "/about", element: <About /> },
      { path: "/addbite", element: <AddBite /> },
      { path: "/allbites", element: <AllBites /> }, 
      { path: "/showcasebite/:id", element: <ShowcaseBite />}, 
      { path: "*", element: <ErrorPage /> } // Render the ErrorPage component for any other path
    ],
  },
];

export default routes;
