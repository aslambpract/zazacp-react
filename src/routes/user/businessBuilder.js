import { lazy } from "react";
import { Navigate } from "react-router";
import { BinaryCheck } from "src/components/binary";
import Loadable from "../Loadable";

const Subscriptions = Loadable(
  lazy(() => import("src/pages/user/businessBuilder/subscriptions/index"))
);

const PayNow = Loadable(
  lazy(() =>
    import("src/pages/user/businessBuilder/subscriptions/payNow/index")
  )
);

const Materials = Loadable(
  lazy(() => import("src/pages/user/businessBuilder/materials/index"))
);

const OrderHistory = Loadable(
  lazy(() => import("src/pages/user/businessBuilder/orderHistory/index"))
);

const Documents = Loadable(
  lazy(() =>
    import("src/pages/user/businessBuilder/materials/subPages/documents/index")
  )
);

const Videos = Loadable(
  lazy(() =>
    import("src/pages/user/businessBuilder/materials/subPages/blog/index")
  )
);

const BusinessBuilderInvoice = Loadable(
  lazy(() => import("src/pages/invoice/businessBuilderInvoice/index"))
);

const businessBuilder = {
  path: "business-builder",
  children: [
    {
      index: true,
      element: (
        <BinaryCheck>
          <Navigate to="subscriptions" />
        </BinaryCheck>
      ),
    },
    {
      path: "subscriptions",
      children: [
        {
          index: true,
          element: (
            <BinaryCheck>
              <Subscriptions />
            </BinaryCheck>
          ),
        },
        {
          path: ":id",
          element: (
            <BinaryCheck>
              <BusinessBuilderInvoice />
            </BinaryCheck>
          ),
        },

        {
          path: "pay-now",
          element: (
            <BinaryCheck>
              <PayNow />
            </BinaryCheck>
          ),
        },
      ],
    },
    {
      path: "history",
      element: (
        <BinaryCheck>
          <OrderHistory />
        </BinaryCheck>
      ),
    },
    {
      path: "materials",
      element: (
        <BinaryCheck>
          <Materials />
        </BinaryCheck>
      ),
      children: [
        {
          index: true,
          element: (
            <BinaryCheck>
              <Navigate to="documents" />
            </BinaryCheck>
          ),
        },

        {
          path: "documents",
          element: (
            <BinaryCheck>
              <Documents />
            </BinaryCheck>
          ),
        },

        {
          path: "videos",
          element: (
            <BinaryCheck>
              <Videos />
            </BinaryCheck>
          ),
        },
      ],
    },
  ],
};

export default businessBuilder;
