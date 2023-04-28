import { lazy } from "react";
import { Navigate } from "react-router";
import LogoOnlyLayout from "src/layouts/LogoOnlyLayout";
import MainLayout from "../layouts/main";
import Loadable from "./Loadable";

const Maintenance = Loadable(lazy(() => import("src/pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("src/pages/Page500")));
const NotFound = Loadable(lazy(() => import("src/pages/Page404")));

const main = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ element: <Navigate to="/auth/login" />, index: true }],
  },
  {
    path: "*",
    element: <LogoOnlyLayout />,
    children: [
      { path: "maintenance", element: <Maintenance /> },
      { path: "500", element: <Page500 /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
];

export default main;
