import { useRoutes } from "react-router-dom";

import PDFViewer from "../components/pdfViewer";
import admin from "./admin";
import auth from "./auth";
import main from "./main";
import user from "./user";

const Router = () => {
  return useRoutes([
    ...auth,
    ...user,
    ...admin,
    ...main,

    { path: "/pdf", element: <PDFViewer /> },
  ]);
};

export default Router;
