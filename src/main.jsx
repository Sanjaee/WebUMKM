import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DetailProducts from "./assets/pages/DetailProducts";
import Home from "./assets/pages/Home";
import Notification from "./assets/pages/Notification";
import CartProducts from "./assets/pages/CartProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <DetailProducts />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/cart",
    element: <CartProducts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
