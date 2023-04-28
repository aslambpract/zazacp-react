import { lazy } from "react";
import { Navigate } from "react-router";
import Loadable from "../Loadable";

const Faq = Loadable(lazy(() => import("src/pages/user/helpCenter/faq/index")));

const KnowledgeBase = Loadable(
  lazy(() => import("src/pages/user/helpCenter/knowledgeBase/index"))
);
const Questions = Loadable(
  lazy(() => import("src/pages/user/helpCenter/knowledgeBase/question/index"))
);

const HelpCenterTicket = Loadable(
  lazy(() => import("src/pages/user/helpCenter/ticket/index"))
);

const ContactSupport = Loadable(
  lazy(() => import("src/pages/user/helpCenter/ticket/contact/index"))
);
const MySupportTicket = Loadable(
  lazy(() => import("src/pages/user/helpCenter/ticket/mysupport/index"))
);
const OtherSupport = Loadable(
  lazy(() => import("src/pages/user/helpCenter/ticket/others/index"))
);

const Tickets = Loadable(
  lazy(() => import("src/pages/user/helpCenter/materialTickets/index"))
);

const TicketView = Loadable(
  lazy(() => import("src/pages/user/helpCenter/ticket/mysupport/viewTickets"))
);

const Mail = Loadable(
  lazy(() => import("src/pages/admin/dashboard/Mail/user/index"))
);
const MailList = Loadable(
  lazy(() => import("src/pages/admin/dashboard/Mail/user/mailList"))
);

const MailDetails = Loadable(
  lazy(() =>
    import("src/pages/admin/dashboard/Mail/subPages/MailDetails/index")
  )
);

const helpCenter = {
  path: "help-center",
  children: [
    { index: true, element: <Navigate to="faqs" /> },
    {
      path: "faqs",
      children: [
        { index: true, element: <Navigate to="product-services" /> },
        {
          path: ":label",
          element: <Faq />,
        },
      ],
    },
    {
      path: "knowledge-base",
      children: [
        {
          index: true,
          element: <KnowledgeBase />,
        },
        {
          path: ":slug",
          element: <Questions />,
        },
      ],
    },
    {
      path: "mails",
      element: <Mail />,
      children: [
        {
          path: ":systemLabel",
          children: [
            {
              index: true,
              element: <MailList />,
            },
            {
              path: ":mailId",
              element: <MailDetails />,
            },
          ],
        },
      ],
    },

    {
      path: "create-ticket",
      children: [
        {
          index: true,
          element: <HelpCenterTicket />,
        },

        {
          path: ":label",
          children: [
            { index: true, element: <Tickets /> },
            { path: ":id", element: <TicketView /> },
          ],
        },

        {
          path: "contact-support",
          element: <ContactSupport />,
        },
        {
          path: "my-support-ticket",
          element: <MySupportTicket />,
        },
        {
          path: "other-support",
          element: <OtherSupport />,
        },
      ],
    },
  ],
};

export default helpCenter;
