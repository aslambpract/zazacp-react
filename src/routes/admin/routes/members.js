import { lazy } from "react";
import { Navigate } from "react-router";
import Loadable from "src/routes/Loadable";

const NetworkMembers = Loadable(
  lazy(() => import("src/pages/admin/members/network"))
);

const MemberProfile = Loadable(
  lazy(() => import("src/pages/admin/members/Profile"))
);

const HoldingTank = Loadable(
  lazy(() => import("src/pages/admin/members/holdingTank/index"))
);
const members = [
  {
    path: "members",
    children: [
      { element: <Navigate to="network" />, index: true },
      { path: "network", element: <NetworkMembers /> },
      {
        path: "holding-tank",
        element: <HoldingTank />,
      },
      { path: "profile/:mid", element: <MemberProfile /> },
    ],
  },
];

export default members;
