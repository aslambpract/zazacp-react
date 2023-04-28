import { lazy } from "react";
import { Navigate } from "react-router";
import { BinaryCheck, NotBinary } from "src/components/binary";
import Loadable from "../Loadable";

const BinaryTree = Loadable(
  lazy(() => import("src/pages/user/genealogy/binary/index"))
);

const BinaryLeg = Loadable(
  lazy(() => import("src/pages/user/genealogy/binaryLeg/index"))
);

const Sponsor = Loadable(
  lazy(() => import("src/pages/user/genealogy/sponsor/index"))
);

const Affiliate = Loadable(
  lazy(() => import("src/pages/user/genealogy/affiliate/index"))
);

const Matrix = Loadable(
  lazy(() => import("src/pages/user/genealogy/matrix/index"))
);

const genealogy = {
  path: "genealogy",
  children: [
    { index: true, element: <Navigate to="binary" /> },
    { path: "binaryLeg", element: <BinaryLeg /> },
    {
      path: "matrix",
      element: (
        <NotBinary>
          <Matrix />
        </NotBinary>
      ),
    },
    {
      path: "binary",
      element: (
        <BinaryCheck>
          <BinaryTree />
        </BinaryCheck>
      ),
    },
    { path: "sponsor", element: <Sponsor /> },
    { path: "affiliate", element: <Affiliate /> },
  ],
};

export default genealogy;
