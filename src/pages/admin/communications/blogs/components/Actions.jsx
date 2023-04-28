import { Divider, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_DASHBOARD } from "src/routes/paths";

const Actions = ({ openDelete, selectedId, isDraft, openPublish }) => {
  const editPath = PATH_DASHBOARD.communication.editBlog(selectedId);

  return (
    <>
      <MenuItem component={Link} to={editPath} sx={{ color: "default.main" }}>
        <Iconify icon={"akar-icons:edit"} />
        Edit
      </MenuItem>

      {isDraft ? (
        <>
          <Divider />
          <MenuItem onClick={openPublish} sx={{ color: "success.main" }}>
            <Iconify icon="material-symbols:publish" />
            Publish
          </MenuItem>
        </>
      ) : null}

      <Divider />
      <MenuItem sx={{ color: "error.main" }} onClick={openDelete}>
        <Iconify icon={"eva:trash-2-outline"} />
        Delete
      </MenuItem>
    </>
  );
};

export default Actions;
