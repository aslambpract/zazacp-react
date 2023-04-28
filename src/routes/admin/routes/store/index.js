import { lazy } from "react";
import { Navigate } from "react-router";
import { BinaryCheck, NotBinary } from "src/components/binary";
import Loadable from "src/routes/Loadable";

const ProductCategories = Loadable(
  lazy(() => import("src/pages/admin/store/productCategories/index"))
);
const Products = Loadable(
  lazy(() => import("src/pages/admin/store/product/index"))
);
const MaterialCategories = Loadable(
  lazy(() => import("src/pages/admin/store/materialCategories/category/index"))
);
const Material = Loadable(
  lazy(() => import("src/pages/admin/store/material/index"))
);
const MaterialAdd = Loadable(
  lazy(() => import("src/pages/admin/store/material/materialAdd/index"))
);
const MaterialView = Loadable(
  lazy(() => import("src/pages/admin/store/material/materialView"))
);
const Events = Loadable(
  lazy(() => import("src/pages/admin/store/events/index"))
);
const EventsAdd = Loadable(
  lazy(() => import("src/pages/admin/store/events/eventAdd"))
);
const EventsEdit = Loadable(
  lazy(() => import("src/pages/admin/store/events/eventEdit"))
);
const Coupons = Loadable(
  lazy(() => import("src/pages/admin/store/coupons/index"))
);
const CouponsAdd = Loadable(
  lazy(() => import("src/pages/admin/store/coupons/couponAdd"))
);
const CouponsEdit = Loadable(
  lazy(() => import("src/pages/admin/store/coupons/couponEdit"))
);
const UserReviews = Loadable(
  lazy(() => import("src/pages/admin/store/userReviews/index"))
);
const UserReviewsAdd = Loadable(
  lazy(() => import("src/pages/admin/store/userReviews/reviewAdd"))
);
const UserReviewsView = Loadable(
  lazy(() => import("src/pages/admin/store/userReviews/reviewView"))
);

const AssignSubscriptionsAddProduct = Loadable(
  lazy(() =>
    import("src/pages/admin/store/assignSubscriptions/addProduct/index")
  )
);
const AssignSubscriptions = Loadable(
  lazy(() => import("src/pages/admin/store/assignSubscriptions/index"))
);
const BusinessBuilderSubscriptions = Loadable(
  lazy(() => import("src/pages/admin/store/businessBuilderSubscriptions/index"))
);
const ProductVideo = Loadable(
  lazy(() => import("src/pages/admin/store/product/Video"))
);
const DocumentViewEdit = Loadable(
  lazy(() => import("src/pages/admin/store/product/document/index"))
);
const ProductAccess = Loadable(
  lazy(() => import("src/pages/admin/store/product/productAccess"))
);
const ProductQuestions = Loadable(
  lazy(() => import("src/pages/admin/store/product/Questions/Main/index"))
);
const ProductEdit = Loadable(
  lazy(() => import("src/pages/admin/store/product/productEdit"))
);
const ProductAdd = Loadable(
  lazy(() => import("src/pages/admin/store/product/productAdd"))
);
const ProductCombo = Loadable(
  lazy(() => import("src/pages/admin/store/product/Combo"))
);
const SampleDocument = Loadable(
  lazy(() => import("src/pages/admin/store/product/sampleDocument/index"))
);

const store = [
  {
    path: "store",
    children: [
      { element: <Navigate to="/404" replace />, index: true },

      {
        path: "assign-subscriptions",
        children: [
          { index: true, element: <AssignSubscriptions /> },
          {
            path: "add_product",
            element: (
              <BinaryCheck>
                <AssignSubscriptionsAddProduct />
              </BinaryCheck>
            ),
          },
        ],
      },

      {
        path: "business_builder_subscriptions",
        element: (
          <BinaryCheck>
            <BusinessBuilderSubscriptions />
          </BinaryCheck>
        ),
      },
      {
        path: "reviews",
        children: [
          { index: true, element: <UserReviews /> },
          { path: "add", element: <UserReviewsAdd /> },
          { path: ":rid", element: <UserReviewsView /> },
        ],
      },
      {
        path: "coupons",
        children: [
          { index: true, element: <Coupons /> },
          { path: "add", element: <CouponsAdd /> },
          { path: ":cid", element: <CouponsEdit /> },
        ],
      },
      {
        path: "events",
        children: [
          { index: true, element: <Events /> },
          { path: "add", element: <EventsAdd /> },
          { path: ":eid", element: <EventsEdit /> },
        ],
      },
      {
        path: "materials",
        children: [
          { index: true, element: <Material /> },
          {
            path: "categories",
            element: <MaterialCategories />,
          },
          { path: "add", element: <MaterialAdd /> },
          {
            path: ":id",
            children: [
              { index: true, element: <MaterialView /> },
              { path: "add", element: <MaterialAdd /> },
            ],
          },
        ],
      },
      {
        path: "products",
        children: [
          { element: <Products />, index: true },
          { path: "categories", element: <ProductCategories /> },
          { path: "add", element: <ProductAdd /> },
          { path: "combo", element: <ProductCombo /> },
          {
            path: ":pid",
            children: [
              { element: <ProductEdit />, index: true },

              { path: "video", element: <ProductVideo /> },
              {
                path: "document",
                element: <DocumentViewEdit />,
              },
              { path: "access", element: <ProductAccess /> },
              {
                path: "questions",
                element: <ProductQuestions />,
              },
              { path: "sample", element: <SampleDocument /> },
            ],
          },
        ],
      },
    ],
  },
];

export default store;
