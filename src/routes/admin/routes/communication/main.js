import { lazy } from "react";
import Loadable from "src/routes/Loadable";

const Mail = Loadable(
  lazy(() => import("src/pages/admin/dashboard/Mail/admin/index"))
);
const MailList = Loadable(
  lazy(() => import("src/pages/admin/dashboard/Mail/admin/mailList"))
);

const MailDetails = Loadable(
  lazy(() =>
    import("src/pages/admin/dashboard/Mail/subPages/MailDetails/index")
  )
);

const mails = {
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
};

export default mails;
