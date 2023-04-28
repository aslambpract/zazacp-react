import { lazy } from "react";
import GuestGuard from "src/guards/GuestGuard";
import Loadable from "./Loadable";

const Login = Loadable(lazy(() => import("src/pages/auth/Login")));
const Register = Loadable(lazy(() => import("src/pages/auth/Register")));
const ResetPassword = Loadable(
  lazy(() => import("src/pages/auth/ResetPassword"))
);
const VerifyCode = Loadable(lazy(() => import("src/pages/auth/VerifyCode")));
const NewPassword = Loadable(
  lazy(() => import("src/pages/auth/NewPassword/index"))
);
const ChangedPassword = Loadable(
  lazy(() => import("src/pages/auth/ChangedPassword"))
);

const auth = [
  {
    path: "auth",
    element: <GuestGuard />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      { path: "login-unprotected", element: <Login /> },
      { path: "register-unprotected", element: <Register /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify", element: <VerifyCode /> },
      { path: "new-password/", element: <NewPassword /> },
      { path: "password-reset/success", element: <ChangedPassword /> },
      {
        path: ":uname",
        element: <Register />,
      },
    ],
  },
];

export default auth;
