import Iconify from "src/components/Iconify";
import { PATH_USER } from "src/routes/paths";

import useLocales from "src/hooks/useLocales";


const useProfileTabs =()=>{
  const { translate } = useLocales();
return [
  {
    value: translate("userProfile.profile"),
    icon: (
      <Iconify icon={"carbon:user-avatar-filled-alt"} width={20} height={20} />
    ),
    href: PATH_USER.profile.root,
  },
  {
    value: translate("userProfile.editInfo"),
    icon: <Iconify icon={"bx:comment-edit"} width={20} height={20} />,
    href: "edit",
  },
  {
    value: translate("userProfile.settings"),
    icon: (
      <Iconify icon={"clarity:settings-solid-badged"} width={20} height={20} />
    ),
    href: "settings",
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
    value: translate("userProfile.referrals"),
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
    value: translate("userProfile.notes"),
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
export default  useProfileTabs;

