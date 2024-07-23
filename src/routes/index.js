import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import { AdminLayout, Layout } from "../layout";
import About from "../pages/about";
import Quality from "../pages/quality";
import Catalog from "../pages/catalog";
import Contact from "../pages/contact";
import Admin from "../pages/admin";
import {PageNotFound , PageNotFoundAdmin} from "../pages/404";
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
        path: "/katalog",
        element: <Catalog />,
      },
      {
        path: "/iletisim",
        element: <Contact />,
      },
      {
        path:'*',
        element: <PageNotFound/>
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
        path: "kalite",
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
        path:'*',
        element: <PageNotFoundAdmin/>
    },
    ],
  },
]);

export default routes;
