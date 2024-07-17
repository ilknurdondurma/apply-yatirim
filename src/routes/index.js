import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import { Layout } from "../layout";
import About from "../pages/about";
import Quality from "../pages/quality";
import Products from "../pages/products";
import Catalog from "../pages/catalog";
import Contact from "../pages/contact";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/hakkimizda",
        element: <About />,
      },
      {
        path: "/kalite",
        element: <Quality />,
      },
      {
        path: "/urunler",
        element: <Products />,
      },
      {
        path: "/katolog",
        element: <Catalog />,
      },
      {
        path: "/iletisim",
        element: <Contact />,
      },
    ],
  },
]);

export default routes;
