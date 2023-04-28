import { lazy } from "react";
import { Navigate } from "react-router";
import { BinaryCheck } from "src/components/binary";
import Loadable from "src/routes/Loadable";

const Report = Loadable(lazy(() => import("src/pages/admin/reports/index")));
const FundReport = Loadable(
  lazy(() => import("src/pages/admin/reports/fund/index"))
);
const BuilderReport = Loadable(
  lazy(() => import("src/pages/admin/reports/builder/index"))
);
const PayoutReport = Loadable(
  lazy(() => import("src/pages/admin/reports/payout/index"))
);

const PointReport = Loadable(
  lazy(() => import("src/pages/admin/reports/point/index"))
);
const SalesReport = Loadable(
  lazy(() => import("src/pages/admin/reports/sales/index"))
);
const JoiningReport = Loadable(
  lazy(() => import("src/pages/admin/reports/joining/index"))
);

const IncomeReport = Loadable(
  lazy(() => import("src/pages/admin/reports/income/index"))
);

const TopEarnersReport = Loadable(
  lazy(() => import("src/pages/admin/reports/topEarners/index"))
);

const reports = [
  {
    path: "report",
    element: <Report />,
    children: [
      {
        element: <Navigate to="builder" />,
        index: true,
      },
      {
        path: "builder",
        element: (
          <BinaryCheck>
            <BuilderReport
              title="Business Builder Report"
              heading="Business Builder Report"
            />
          </BinaryCheck>
        ),
      },
      {
        path: "fund/credit",
        element: (
          <FundReport title="Fund Credit Report" heading="Fund Credit Report" />
        ),
      },
      {
        path: "joining",
        element: (
          <JoiningReport title="Joining Report" heading="Joining Report" />
        ),
      },
      {
        path: "income",
        element: (
          <IncomeReport
            title="Member Income Report"
            heading="Member Income Report"
          />
        ),
      },
      {
        path: "payout",
        element: <PayoutReport title="Payout Report" heading="Payout Report" />,
      },

      {
        path: "point/history",
        element: (
          <PointReport
            title="Point History Report"
            heading="Point History Report"
          />
        ),
      },
      {
        path: "earners",
        element: (
          <TopEarnersReport
            title="Top Earners Report"
            heading="Top Earners Report"
          />
        ),
      },
      {
        path: "sales",
        element: <SalesReport title="Sales Report" heading="Sales Report" />,
      },
    ],
  },
];

export default reports;
