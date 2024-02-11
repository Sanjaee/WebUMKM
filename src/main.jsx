import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./assets/pages/Home";
import Notification from "./assets/pages/Notification";
import CartProducts from "./assets/pages/CartProducts";
import ProductDetail from "./assets/pages/DetailProducts";
import ProductSearch from "./assets/pages/ProductSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/cart",
    element: <CartProducts />,
  },
  {
    path: "/products/:id",
    element: <ProductSearch />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
