import { Divider, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import useImpersonate from "src/hooks/useImpersonate";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const Actions = ({ openDelete, openEdit, userId, openBlock, isBlocked }) => {
  const { translate } = useLocales()
  const onImpersonate = useImpersonate(userId);
  return (
    <>
      <MenuItem sx={{ color: "default.main" }} onClick={onImpersonate}>
        <Iconify icon={"ant-design:user-switch-outlined"} />
        {translate("adminStore.assignSubscriptions.trashed")} impersonate
      </MenuItem>
      <MenuItem
        sx={{ color: "default.main" }}
        component={Link}
        to={`${PATH_DASHBOARD.members.member_profile}/${userId}`}
      >
        <Iconify icon={"ant-design:user-outlined"} />
       {translate("adminStore.assignSubscriptions.Profile")}  
      </MenuItem>
      <MenuItem sx={{ color: "default.main" }} onClick={openEdit}>
        <Iconify icon={"akar-icons:edit"} />
        {translate("adminStore.assignSubscriptions.edit")}
      </MenuItem>
      <MenuItem
        sx={{ color: "default.main" }}
        onClick={() => {
          alert("Email");
        }}
      >
        <Iconify icon={"fluent:mail-16-regular"} />
        {translate("adminStore.assignSubscriptions.email")} 
      </MenuItem>
      <MenuItem
        onClick={openBlock}
        sx={{
          color: "warning.main",
        }}
      >
        <Iconify icon={"bx:block"} />
        {isBlocked ? translate("adminStore.assignSubscriptions.unBlockUser") : translate("adminStore.assignSubscriptions.blockUser")}
      </MenuItem>

      <Divider />

      <MenuItem sx={{ color: "error.main" }} onClick={openDelete}>
        <Iconify icon={"eva:trash-2-outline"} />
        {translate("adminStore.assignSubscriptions.delete")} 
      </MenuItem>
    </>
  );
};

export default Actions;
