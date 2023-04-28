import { lazy } from "react";
import { Navigate } from "react-router";
import { BinaryCheck } from "src/components/binary";
import Ternary from "src/components/ternary";
import Loadable from "src/routes/Loadable";
import { isBinary, isNotBinary } from "src/utils/isBinary";

const BrandSettings = Loadable(
  lazy(() => import("src/pages/admin/settings/brand"))
);
const BusinessSettings = Loadable(
  lazy(() => import("src/pages/admin/settings/business/index"))
);
const NetworkSettings = Loadable(
  lazy(() => import("src/pages/admin/settings/network/index"))
);

const Withdrawal = Loadable(
  lazy(() => import("src/pages/admin/settings/withdrawal/index"))
);

const Referral = {
  binary: Loadable(
    lazy(() => import("src/pages/admin/settings/network/@pages/referral/index"))
  ),
  nonBinary: Loadable(
    lazy(() => import("src/pages/admin/settings/network/@pages/settings/index"))
  ),
};

const Bonus = Loadable(
  lazy(() => import("src/pages/admin/settings/network/@pages/first/index"))
);

const Level = Loadable(
  lazy(() => import("src/pages/admin/settings/network/@pages/level/index"))
);
const Bronze = Loadable(
  lazy(() => import("src/pages/admin/settings/network/@pages/binary/index"))
);
const Binary = Loadable(
  lazy(() => import("src/pages/admin/settings/network/@pages/binary/index"))
);
const Rank = Loadable(
  lazy(() => import("src/pages/admin/settings/network/@pages/rank/index"))
);

const settings = [
  {
    path: "settings",
    children: [
      { element: <Navigate to="brand" />, index: true },
      { path: "brand", element: <BrandSettings /> },
      {
        path: "business",
        element: (
          <BinaryCheck>
            <BusinessSettings />
          </BinaryCheck>
        ),
      },
      {
        path: "network",
        element: <NetworkSettings />,
        children: [
          {
            index: true,
            element: <Navigate to={isNotBinary() ? "referral" : "rank"} />,
          },
          {
            path: "referral",
            element: (
              <Ternary
                when={isBinary()}
                then={<Referral.binary />}
                otherwise={<Referral.nonBinary />}
              />
            ),
          },
          {
            path: "bonus",
            element: <Bonus />,
          },
          {
            path: "level",
            element: <Level />,
          },
          {
            path: "binary",
            element: (
              <BinaryCheck>
                <Binary />
              </BinaryCheck>
            ),
          },
          {
            path: "rank",
            element: (
              <BinaryCheck>
                <Rank />
              </BinaryCheck>
            ),
          },
          {
            path: "bronze",
            element: (
              <BinaryCheck>
                <Bronze />
              </BinaryCheck>
            ),
          },
        ],
      },
      { path: "withdrawal", element: <Withdrawal /> },
    ],
  },
];

export default settings;
