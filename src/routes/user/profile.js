import { lazy } from "react";
import Loadable from "../Loadable";

const Wrapper = Loadable(lazy(() => import("src/pages/user/profile/index")));
const Profile = Loadable(
  lazy(() => import("src/pages/user/profile/subPages/profile/index"))
);

const Settings = Loadable(
  lazy(() => import("src/pages/user/profile/subPages/accountSettings/index"))
);

const Referrals = Loadable(
  lazy(() => import("src/pages/user/profile/subPages/referrals/index"))
);

const Notes = Loadable(
  lazy(() => import("src/pages/user/profile/subPages/notes/index"))
);

const Edit = Loadable(
  lazy(() => import("src/pages/user/profile/subPages/edit/index"))
);

const profile = {
  path: "profile",
  element: <Wrapper />,
  children: [
    { index: true, element: <Profile /> },

    { path: "settings", element: <Settings /> },
    { path: "referrals", element: <Referrals /> },
    { path: "notes", element: <Notes /> },
    { path: "edit", element: <Edit /> },
  ],
};

export default profile;
