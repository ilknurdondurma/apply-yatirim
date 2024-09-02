import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, Layout } from "../layout";
import PrivateRoute from "./private route"
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
import AdminQuality from "../pages/admin/quality";
import AdminAbout from "../pages/admin/about";
import AdminAddProduct from "../pages/admin/products/add-product";
import AdminCatalogList from "../pages/admin/catalogs/catalog-list";
import AdminAddCatalog from "../pages/admin/catalogs/add-catalog";
import AdminContact from "../pages/admin/contact";
import ProductDetail from "../pages/detail";
import AdminCategories from "../pages/admin/manager/categories";
import AdminUsers from "../pages/admin/manager/users";
import AdminComments from "../pages/admin/manager/comments";
import AdminProperties from "../pages/admin/manager/properties";
import AdminModels from "../pages/admin/manager/brand-model";
import { ScrollToTop } from "./scroll";


const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
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
        path: '/product',
        element: <ProductDetail/>,
        children:[
            {
                index:true,
                element:<ProductDetail/>
            },
            {
                path:"/product/:id" , element:<ProductDetail/>
            },
            {
                path:"/product/:name" , element:<ProductDetail/>
            }
        ]
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
    element:
      <>
        <ScrollToTop />
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      </>,
    children: [
      

      //*****Anasayfa */
      {
        index: true,
        path: "website",
        element: <PrivateRoute> <AdminWebsite /></PrivateRoute>,
      },
      {
        path: "hizmetler",
        element: <PrivateRoute><AdminServices /></PrivateRoute> ,
      },
      {
        path: "ekibimiz",
        element: <PrivateRoute> <AdminTeams /></PrivateRoute> ,
      },
      {
        path: "kategoriler",
        element: <PrivateRoute> <AdminCategories /></PrivateRoute>,
      },
      {
        path: "kullanicilar",
        element: <PrivateRoute> <AdminUsers /></PrivateRoute>,
      },
      {
        path: "yorumlar",
        element: <PrivateRoute> <AdminComments /></PrivateRoute>,
      },
      {
        path: "ozellikler",
        element: <PrivateRoute> <AdminProperties /></PrivateRoute>,
      },
      {
        path: "modeller",
        element: <PrivateRoute> <AdminModels /></PrivateRoute>,
      },

      {
        path: "hakkimizda",
        element: <PrivateRoute> <AdminAbout /></PrivateRoute>,
      },
      {
        path: "kalite",
        element: <PrivateRoute> <AdminQuality /></PrivateRoute>,
      },
      {
        path: "urun-listesi",
        element: <PrivateRoute> <AdminProductList /></PrivateRoute>,
      },
      {
        path: "urun-ekle",
        element: <PrivateRoute> <AdminAddProduct/></PrivateRoute>,
      },
      {
        path: "katalog-listesi",
        element: <PrivateRoute> <AdminCatalogList /></PrivateRoute>,
      },
      {
        path: "katalog-ekle",
        element: <PrivateRoute> <AdminAddCatalog/></PrivateRoute>,
      },
      {
        path: "iletisim",
        element: <PrivateRoute> <AdminContact /></PrivateRoute>,
      },
      {
        path:'*',
        element:<PrivateRoute>  <AdminPageNotFound/></PrivateRoute>
    },
    ],
  },
]);

export default routes;
