import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddCarForm from "./pages/AddCarForm";
import MyCar from "./pages/MyCar";





const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/add-car',
        element:<PrivateRoute>
          <AddCarForm></AddCarForm>
        </PrivateRoute>
      },
      {
        path:'/my-cars',
        element:<PrivateRoute>
          <MyCar></MyCar>
        </PrivateRoute>
      }
    ]
  },
  {
    path:'*',
    element:<ErrorPage></ErrorPage>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
