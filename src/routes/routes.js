import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import UserInfo from "../components/UserInfo";
import Main from "../layout/Main";
import PrivateRoute from "../routes/PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Register></Register> },
      { path: "/register", element: <Register></Register> },
      { path: "/login", element: <Login></Login> },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <UserInfo></UserInfo>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
