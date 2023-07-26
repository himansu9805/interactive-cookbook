import {
  useRoutes
} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Recipe from "../pages/Recipe";
import { Navigate, Outlet } from 'react-router-dom';


export const Routes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  let routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: isLoggedIn ? <Dashboard /> : <Navigate to={'/login'} />
    },

    {
      path: "/recipe/:id",
      element: isLoggedIn ? <Recipe /> : <Navigate to={'/login'} />
    },

  ]);

  return routes;
}