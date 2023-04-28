import { Navigate } from "react-router-dom";
import { PATH_AFTER_LOGIN } from "src/config";
import AuthGuard, { AdminGuard } from "src/guards/AuthGuard";
import Layout from "src/layouts/layout";

import routes from "./routes";

const admin = [
  {
    path: "admin",
    element: (
      <AuthGuard>
        <AdminGuard>
          <Layout />
        </AdminGuard>
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      ...routes,
    ],
  },
];

export default admin;
