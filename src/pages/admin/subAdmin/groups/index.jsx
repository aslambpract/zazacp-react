import { Box } from "@mui/material";
import { useState } from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import AddGroup from "./components/addGroup";
import AddGroupButton from "./components/addGroupButton";
import GroupTable from "./components/groupTable";

const Index = () => {
  const { translate } = useLocales();
  const [openAdd, setOpenAdd] = useState(false);
  const [load, setLoad] = useState(false);
  const [selected, setSelected] = useState({
    id: null,
    permissionString: "",
    name: "",
    description: "",
  });
  const onEdit = (data) => {
    setSelected(data);
    setOpenAdd(true);
  };

  const onSuccess = () => {
    setLoad(true);
    setOpenAdd(false);
  };

  return (
    <div>
      <Page title={translate("adminSubAdmin.subAdmin.addUserGroup")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSubAdmin.subAdmin.addUserGroup")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              {
                name: translate("adminSubAdmin.subAdmin.subAdmins"),
                href: PATH_DASHBOARD.subAdmin.root,
              },
              { name: translate("adminSubAdmin.subAdmin.userGroup") },
            ]}
            action={
              <AddGroupButton changeStatus={(status) => setOpenAdd(status)} />
            }
          />

          <AddGroup open={openAdd} selected={selected} onSuccess={onSuccess} />
          <GroupTable onEdit={onEdit} load={load} />
        </Box>
      </Page>
    </div>
  );
};

export default Index;
