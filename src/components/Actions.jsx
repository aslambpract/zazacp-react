import { Divider, MenuItem } from "@mui/material";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";


const Actions = ({ openEdit, openDelete }) => {
  const { translate } = useLocales();
  return (
    <>
      <MenuItem sx={{ color: "default.main" }} onClick={openEdit}>
        <Iconify icon={"akar-icons:edit"} />
       {translate("adminStore.coupons.edit")} 
      </MenuItem>
      <Divider />
      <MenuItem sx={{ color: "error.main" }} onClick={openDelete}>
        <Iconify icon={"eva:trash-2-outline"} />
       {translate("adminStore.coupons.delete")} 
      </MenuItem>
    </>
  );
};

export default Actions;
