import Iconify from "src/components/Iconify";
import EditInfo from "./components/EditInfo";
import {
  Profile,
  ProfileAccountSettings,
  ProfileNotes,
  ProfileReferrals,
} from "./components/index";

import i18n from "src/locales/i18n"

const useProfileTabs=()=>{
return [
  {
    value: i18n.t("profile.profileE")  ,
    icon: (
      <Iconify icon={"carbon:user-avatar-filled-alt"} width={20} height={20} />
    ),
    component: () => <Profile />,
    key:  "user_profile",
  },
  {
    value:  i18n.t("profile.editInfo") ,
    icon: <Iconify icon={"bx:comment-edit"} width={20} height={20} />,
    component: () => <EditInfo />,
    key: "user_profile",
  },
  {
    value: i18n.t("profile.settings") ,
    icon: (
      <Iconify icon={"clarity:settings-solid-badged"} width={20} height={20} />
    ),
    component: (data) => <ProfileAccountSettings />,
    key: "user_profile",
  },
  {
    value: i18n.t("profile.referralsS") ,
    icon: (
      <Iconify icon={"icon-park-solid:message-sent"} width={20} height={20} />
    ),
    component: () => <ProfileReferrals />,
    key: "user_profile",
  },

  {
    value: i18n.t("profile.notes")  ,
    icon: (
      <Iconify
        icon={"fluent:clipboard-note-20-filled"}
        width={20}
        height={20}
      />
    ),
    component: () => <ProfileNotes />,
    key: "user_profile",
  },
];

}
export default useProfileTabs;

