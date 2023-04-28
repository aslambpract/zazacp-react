import { lazy } from "react";
import { Navigate } from "react-router";
import AuthGuard, { UserGuard } from "src/guards/AuthGuard";
import Layout from "src/layouts/layout";
import Loadable from "../Loadable";
import businessBuilder from "./businessBuilder";
import financial from "./financial";
import genealogy from "./genealogy";
import helpCenter from "./helpCenter";
import profile from "./profile";
import subscriptions from "./subscriptions";

const ProductList = Loadable(
  lazy(() =>
    import("src/pages/user/onlineStore/productSubscription/productList/index")
  )
);
const ProductDetails = Loadable(
  lazy(() =>
    import("src/pages/user/onlineStore/productSubscription/details/index")
  )
);
const Checkout = Loadable(
  lazy(() =>
    import("src/pages/user/onlineStore/productSubscription/checkout/index")
  )
);
const MyOrders = Loadable(
  lazy(() => import("src/pages/user/onlineStore/myOrders/index"))
);

const ViewOrderById = Loadable(
  lazy(() => import("src/pages/invoice/myOrders/index"))
);

const BlogPosts = Loadable(
  lazy(() => import("src/pages/user/blogs/BlogPosts"))
);
const BlogPost = Loadable(lazy(() => import("src/pages/user/blogs/BlogPost")));

const Dashboard = Loadable(
  lazy(() => import(`src/pages/user/dashboard/index`))
);

const IncomeReport = Loadable(
  lazy(() => import("src/pages/user/incomeReport"))
);
const MissedPoints = Loadable(
  lazy(() => import("src/pages/user/missedPoints"))
);

const Events = Loadable(lazy(() => import("src/pages/user/events/index")));

const user = [
  {
    path: "user",
    element: (
      <AuthGuard>
        <UserGuard>
          <Layout />
        </UserGuard>
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to="dashboard" />, index: true },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "online-store",
        children: [
          {
            path: "product-subscription",
            children: [
              { index: true, element: <ProductList /> },
              {
                path: "checkout",
                element: <Checkout />,
              },
              { path: ":name", element: <ProductDetails /> },
            ],
          },
          {
            path: "my-orders",
            children: [
              { index: true, element: <MyOrders /> },
              {
                path: ":id",
                element: <ViewOrderById />,
              },
            ],
          },
        ],
      },
      {
        path: "blogs",
        children: [
          { index: true, element: <BlogPosts /> },
          { path: ":id", element: <BlogPost /> },
        ],
      },
      { path: "income-report", element: <IncomeReport /> },
      { path: "missed-points", element: <MissedPoints /> },
      { ...businessBuilder },
      { ...genealogy },
      { ...subscriptions },
      { ...financial },
      { ...helpCenter },
      { ...profile },
    ],
  },
];

export default user;
