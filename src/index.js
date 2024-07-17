import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Provider} from 'react-redux'
import {RouterProvider} from "react-router-dom";
import store from './redux/store.js'
import routes from './routes'
import {AuthProvider} from "../src/context/authContext/authContext.js"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={routes}>
          </RouterProvider>
      </Provider>
    </AuthProvider>
);

