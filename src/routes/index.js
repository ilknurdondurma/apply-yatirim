import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, Layout } from "../layout";
//user
import Home from "../pages/home";
import Login from "../pages/login";
import About from "../pages/about";
import Quality from "../pages/quality";
import Catalog from "../pages/catalog";
import Contact from "../pages/contact";
import Admin from "../pages/admin";
import Products from "../pages/products";
import {PageNotFound , AdminPageNotFound} from "../pages/404";

//admin
import AdminProductList from "../pages/admin/products/product-list";
import AdminWebsite from "../pages/admin/home/website";
import AdminServices from "../pages/admin/home/services";
import AdminTeams from "../pages/admin/home/teams";
import AdminBlogs from "../pages/admin/home/blogs";
import AdminQuality from "../pages/admin/quality";
import AdminAbout from "../pages/admin/about";
import AdminAddProduct from "../pages/admin/products/add-product";
import AdminCatalogList from "../pages/admin/catalogs/catalog-list";
import AdminAddCatalog from "../pages/admin/catalogs/add-catalog";
import AdminContact from "../pages/admin/contact";


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

      //*****Anasayfa */
      {
        path: "website",
        element: <AdminWebsite />,
      },
      {
        path: "hizmetler",
        element: <AdminServices />,
      },
      {
        path: "ekibimiz",
        element: <AdminTeams />,
      },
      {
        path: "bloglar",
        element: <AdminBlogs />,
      },
      {
        path: "hakkimizda",
        element: <AdminAbout />,
      },
      {
        path: "kalite",
        element: <AdminQuality />,
      },
      {
        path: "urun-listesi",
        element: <AdminProductList />,
      },
      {
        path: "urun-ekle",
        element: <AdminAddProduct/>,
      },
      {
        path: "katalog-listesi",
        element: <AdminCatalogList />,
      },
      {
        path: "katalog-ekle",
        element: <AdminAddCatalog/>,
      },
      {
        path: "iletisim",
        element: <AdminContact />,
      },
      {
        path:'*',
        element: <AdminPageNotFound/>
    },
    ],
  },
]);

export default routes;
