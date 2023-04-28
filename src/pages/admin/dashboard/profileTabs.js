import Iconify from "src/components/Iconify";
import { PATH_DASHBOARD } from "src/routes/paths";

import i18n from "src/locales/i18n"


const useProfileTabs=()=>{
 
return[
  {
    value: i18n.t("headerSettings.profile")  ,
    icon: (
      <Iconify icon={"carbon:user-avatar-filled-alt"} width={20} height={20} />
    ),
    href: PATH_DASHBOARD.user.profile,
  },
  {
    value: i18n.t("headerSettings.editInfo")  ,
    icon: <Iconify icon={"bx:comment-edit"} width={20} height={20} />,
    href: "edit",
  },
  {
    value: i18n.t("headerSettings.settings")  ,
    icon: (
      <Iconify icon={"clarity:settings-solid-badged"} width={20} height={20} />
    ),
    href:"settings",
  },
  // {
  //   value: 'pay out',
  //   icon: <Iconify icon={'bi:currency-exchange'} width={20} height={20} />,
  // },
  // {
  //   value: 'enable 2FA',
  //   icon: <Iconify icon={'ic:baseline-security'} width={20} height={20} />,
  // },
  {
    value: i18n.t("headerSettings.referrals")  ,
    icon: (
      <Iconify icon={"icon-park-solid:message-sent"} width={20} height={20} />
    ),
    href: "referrals",
  },
  // {
  //   value: 'email settings',
  //   icon: <Iconify icon={'dashicons:email-alt'} width={20} height={20} />,
  // },
  {
    value:  i18n.t("headerSettings.notes") ,
    icon: (
      <Iconify
        icon={"fluent:clipboard-note-20-filled"}
        width={20}
        height={20}
      />
    ),
    href: "notes",
  },
];

}
export default useProfileTabs;



