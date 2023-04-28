import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";

const AddGroupButton = ({ changeStatus }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const { translate } = useLocales();

  useMemo(() => {
    changeStatus(openAdd);
  }, [openAdd]);

  return (
    <Button
      color={openAdd ? "error" : "primary"}
      onClick={() => setOpenAdd(!openAdd)}
      variant="contained"
      startIcon={
        <Iconify
          icon={openAdd ? "material-symbols:close" : "material-symbols:add"}
        />
      }
    >
      {openAdd
        ? translate("cancel")
        : translate("adminSubAdmin.subAdmin.group")}
    </Button>
  );
};

export default AddGroupButton;
