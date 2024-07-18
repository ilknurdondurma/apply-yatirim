import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import { AdminLayout, Layout } from "../layout";
import About from "../pages/about";
import Quality from "../pages/quality";
import Catalog from "../pages/catalog";
import Contact from "../pages/contact";
import Admin from "../pages/admin";

import Products from "../pages/products";
import ProductsAdmin from "../pages/admin/products";

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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "dashboard",
        element: <Admin />,
      },
      {
        path: "urunler",
        element: <ProductsAdmin />,
      },
      {
        path: "katalog",
        element: <Admin />,
      },
      {
        path: "iletisim",
        element: <Admin />,
      },
      {
        path: "hakkimizda",
        element: <Admin />,
      },
      {
        path: "logout",
        element: <Admin />,
      },
    ],
  },
]);

export default routes;
