import { Box, Button, Divider, Drawer, List } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import { SkeletonMailSidebarItem } from "src/components/skeleton";
import { NAVBAR } from "src/config";
import useResponsive from "src/hooks/useResponsive";
import { PATH_USER } from "src/routes/paths";
import SidebarItem from "./sidebarItem";

const _data = [
  // {
  //   id: "dashboard",
  //   type: "system",
  //   name: "ticket dashboard",
  //   link: "dashboard",
  // },
  { id: "all", type: "system", name: "all tickets", slug: "all" },
  { id: "overdue", type: "system", name: "overdue", slug: "overdue" },
  { id: "open", type: "system", name: "open", slug: "open" },
  { id: "resolved", type: "system", name: "resolved", slug: "resolved" },
  { id: "closed", type: "system", name: "closed", slug: "closed" },
  {
    id: "inprogress",
    type: "system",
    name: "in progress",
    slug: "in_progress",
  },
  { id: "responded", type: "system", name: "responded", slug: "responded" },
];

const Sidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "md");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          component={RouterLink}
          to={PATH_USER.helpCenter.createTicket.contactSupport}
        >
          Create Ticket
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {_data.map((label, index) =>
          label ? (
            <SidebarItem key={label.id} label={label} />
          ) : (
            <SkeletonMailSidebarItem key={index} />
          )
        )}
      </List>
    </Scrollbar>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: { width: NAVBAR.BASE_WIDTH, position: "relative" },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
};

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onOpenCompose: PropTypes.func,
  onCloseSidebar: PropTypes.func,
};

export default Sidebar;
