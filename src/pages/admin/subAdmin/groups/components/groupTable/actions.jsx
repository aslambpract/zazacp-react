import { MenuItem } from "@mui/material";
import { useMemo, useState } from "react";
import Iconify from "src/components/Iconify";
import MenuPopover from "src/components/MenuPopover";
import useLocales from "src/hooks/useLocales";

const Actions = ({ forwardRef, onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { translate } = useLocales();
  const handleClose = (name) => () => {
    onClose(name);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useMemo(() => {
    setAnchorEl(forwardRef);
  }, [forwardRef]);

  return (
    <>
      <TableMenu anchorEl={anchorEl} open={open} onClose={handleClose()}>
        <MenuItem onClick={handleClose("edit")}>
          <Iconify icon="material-symbols:edit" /> {translate("edit")}
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleClose("delete")}>
          <Iconify icon={"eva:trash-2-outline"} />
          {translate("delete")}
        </MenuItem>
      </TableMenu>
    </>
  );
};

const TableMenu = ({ open, onClose, anchorEl, children }) => (
  <MenuPopover
    open={Boolean(open)}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "left" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    arrow="right-top"
    sx={{
      mt: -1,
      width: 160,
      "& .MuiMenuItem-root": {
        px: 1,
        typography: "body2",
        borderRadius: 0.75,
        "& svg": { mr: 2, width: 20, height: 20 },
      },
    }}
  >
    {children}
  </MenuPopover>
);

export default Actions;
