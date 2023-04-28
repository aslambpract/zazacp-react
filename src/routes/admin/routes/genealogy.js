import { lazy } from "react";
import { Navigate } from "react-router";
import { BinaryCheck, NotBinary } from "src/components/binary";
import Loadable from "src/routes/Loadable";
const Matrix = Loadable(
  lazy(() => import("src/pages/admin/genealogy/matrix/index"))
);

const Binary = Loadable(
  lazy(() => import("src/pages/admin/genealogy/binary/index"))
);
const Sponsor = Loadable(
  lazy(() => import("src/pages/admin/genealogy/sponsor/index"))
);
const Tree = Loadable(
  lazy(() => import("src/pages/admin/genealogy/tree/index"))
);

const genealogy = [
  {
    path: "genealogy",
    children: [
      { element: <Navigate to="binary" />, index: true },
      {
        path: "binary",
        element: (
          <BinaryCheck>
            <Binary />
          </BinaryCheck>
        ),
      },
      {
        path: "matrix",
        element: (
          <NotBinary>
            <Matrix />
          </NotBinary>
        ),
      },
      { path: "sponsor", element: <Sponsor /> },
      { path: "tree", element: <Tree /> },
    ],
  },
];

export default genealogy;
