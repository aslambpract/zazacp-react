import { lazy } from "react";
import { Navigate } from "react-router";
import Loadable from "src/routes/Loadable";

const SubAdmin = Loadable(lazy(() => import("src/pages/admin/subAdmin/index")));

const AddSubAdminGroup = Loadable(
  lazy(() => import("src/pages/admin/subAdmin/groups/index"))
);
const SubAdminProfile = Loadable(
  lazy(() => import("src/pages/admin/subAdmin/Profile"))
);
const AddSubAdmin = Loadable(
  lazy(() => import("src/pages/admin/subAdmin/subAdmins"))
);

const subAdmin = [
  {
    path: "sub-admin",
    children: [
      { index: true, element: <SubAdmin /> },
      { path: ":sid", element: <SubAdminProfile /> },
      { path: "add", element: <AddSubAdmin /> },
      {
        path: "group",
        children: [
          { index: true, element: <Navigate to="add" /> },
          { path: "add", element: <AddSubAdminGroup /> },
        ],
      },
    ],
  },
];

export default subAdmin;
