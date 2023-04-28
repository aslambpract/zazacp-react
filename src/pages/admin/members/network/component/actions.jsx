import { Divider, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import useImpersonate from "src/hooks/useImpersonate";
import { PATH_DASHBOARD } from "src/routes/paths";
import useTurnOfEmail from "./hooks/useTurnOfEmail";
import useLocales from "src/hooks/useLocales";

const Actions = ({
  isMailVerified,
  isMailTurnedOn,
  openChangePassword,
  openChangeUsername,
  openBlock,
  selectedId,
  isBlocked,
  handleOpenTurnOnMail,
  handleOpenVerify,
}) => {
  const { translate } = useLocales();
  const onImpersonate = useImpersonate(selectedId);
  return (
    <>
      <MenuItem sx={{ color: "default.main" }} onClick={openChangePassword}>
        <Iconify icon={"ri:lock-password-line"} />
       {translate("adminMembersManagement.networkMembers.password")} 
      </MenuItem>
      <MenuItem sx={{ color: "default.main" }} onClick={openChangeUsername}>
        <Iconify icon={"bxs:user-account"} />
       {translate("adminMembersManagement.networkMembers.username")} 
      </MenuItem>
      <MenuItem onClick={onImpersonate} sx={{ color: "default.main" }}>
        <Iconify icon={"ant-design:user-switch-outlined"} />
       {translate("adminMembersManagement.networkMembers.impersonate")} 
      </MenuItem>
      <MenuItem
        component={Link}
        to={`${PATH_DASHBOARD.members.member_profile}/${selectedId}`}
        sx={{ color: "default.main" }}
      >
        <Iconify icon={"ant-design:user-outlined"} />
        {translate("adminMembersManagement.networkMembers.profile")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          if (isMailVerified) return;
          handleOpenVerify();
        }}
        sx={{ color: "default.main" }}
      >
        <Iconify icon={"fluent:mail-16-regular"} />
        {isMailVerified ? translate("adminMembersManagement.networkMembers.verified") : translate("adminMembersManagement.networkMembers.verify")}
      </MenuItem>
      <MenuItem onClick={handleOpenTurnOnMail} sx={{ color: "default.main" }}>
        <Iconify icon={"carbon:notification-off"} />
        {isMailTurnedOn ?translate("adminMembersManagement.networkMembers.turnOffEmail") : translate("adminMembersManagement.networkMembers.turnOnEmail")}
      </MenuItem>

      <Divider />
      <MenuItem sx={{ color: "warning.main" }} onClick={openBlock}>
        <Iconify icon={"ic:outline-block"} />
        {isBlocked ?translate("adminMembersManagement.networkMembers.unBlockUser") : translate("adminMembersManagement.networkMembers.blockUser")}
      </MenuItem>
    </>
  );
};

export default Actions;
