import {
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    // element: <ProtectedRoute component={<Dashboard />} />,
    element: <Dashboard />,
  }
]);