import { lazy } from "react";
import { Navigate } from "react-router";
import Loadable from "src/routes/Loadable";

const Ewallet = Loadable(
  lazy(() => import("src/pages/admin/financial/ewallet"))
);
const DepositWallet = Loadable(
  lazy(() => import("src/pages/admin/financial/deposit"))
);
const FundCredits = Loadable(
  lazy(() => import("src/pages/admin/financial/fundCredit"))
);
const Payout = Loadable(
  lazy(() => import("src/pages/admin/financial/payout/payout"))
);
const FinancialReport = Loadable(
  lazy(() =>
    import("src/pages/admin/financial/financialReport/financialReport")
  )
);

const LatestSales = Loadable(
  lazy(() => import("src/pages/admin/financial/sales/index"))
);

const financial = [
  {
    path: "financial",
    children: [
      { element: <Navigate to="e-wallet" />, index: true },
      { path: "e-wallet", element: <Ewallet /> },
      { path: "deposit-wallet", element: <DepositWallet /> },
      { path: "fund-credits", element: <FundCredits /> },
      { path: "payout", element: <Payout /> },
      { path: "report", element: <FinancialReport /> },
      { path: "sales", element: <LatestSales /> },
    ],
  },
];

export default financial;
