import { lazy } from "react";
import { Navigate } from "react-router";
import DepositWallet from "src/pages/user/financial/deposit";
import Ewallet from "src/pages/user/financial/ewallet";
import FundTransfer from "src/pages/user/financial/fundTransfer";
import Loadable from "../Loadable";

const AddCredit = Loadable(
  lazy(() => import("src/pages/user/financial/deposit/addCredit"))
);

const RequestPayout = Loadable(
  lazy(() => import("src/pages/user/financial/requestPayout/index"))
);

const financial = {
  path: "financial",
  children: [
    { index: true, element: <Navigate to="e-wallet" /> },
    { path: "e-wallet", element: <Ewallet /> },
    {
      path: "deposit-wallet",
      children: [
        { index: true, element: <DepositWallet /> },
        { path: "add-credit", element: <AddCredit /> },
      ],
    },
    { path: "funds-transfer", element: <FundTransfer /> },
    { path: "payout", element: <RequestPayout /> },
  ],
};

export default financial;
