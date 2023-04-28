import { Divider, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import Iconify from "src/components/Iconify";
import useImpersonate from "src/hooks/useImpersonate";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";

const Actions = ({ openEdit, openDelete, id, impersonationId }) => {
  const { translate } = useLocales();
  const impersonate = useImpersonate(impersonationId);
  return (
    <>
      <MenuItem
        component={Link}
        to={PATH_DASHBOARD.communication.viewTickets(id)}
        sx={{ color: "default.main" }}
      >
        <Iconify icon={"carbon:view"} />
        {translate("adminCommunication.helpCenter.view")}
      </MenuItem>
      <MenuItem sx={{ color: "default.main" }} onClick={impersonate}>
        <Iconify icon={"ant-design:user-switch-outlined"} />
        {translate("adminCommunication.helpCenter.impersonate")}
      </MenuItem>

      <MenuItem onClick={openEdit} sx={{ color: "default.main" }}>
        <Iconify icon={"akar-icons:edit"} />
        {translate("adminCommunication.helpCenter.edit")}
      </MenuItem>

      <Divider />

      <MenuItem onClick={openDelete} sx={{ color: "error.main" }}>
        <Iconify icon={"eva:trash-2-outline"} />
        {translate("adminCommunication.helpCenter.delete")}
      </MenuItem>
    </>
  );
};

export default Actions;
