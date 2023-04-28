import { Box, Stack, Toolbar, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Logo from "src/components/Logo";
import { IconButtonAnimate } from "src/components/animate";
import Settings from "src/components/settings";
import { HEADER } from "src/config";
import useAuth from "src/hooks/useAuth";
import useOffSetTop from "src/hooks/useOffSetTop";
import useResponsive from "src/hooks/useResponsive";
import { RootStyle } from "src/layouts/shared";
import { PATH_DASHBOARD } from "src/routes/paths";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import NotificationsPopover from "./NotificationsPopover";
import QuickPopover from "./QuickPopover";

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive("up", "lg");

  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => {
    setOpenSettings((prev) => !prev);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };
  const { isAdmin } = useAuth();
  return (
    <>
      <RootStyle
        isCollapse={isCollapse}
        isOffset={isOffset}
        verticalLayout={verticalLayout}
      >
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
            minHeight: "100% !important",
            px: { lg: 5 },
          }}
        >
          {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

          {!isDesktop && (
            <>
              <IconButtonAnimate
                onClick={onOpenSidebar}
                sx={{ mr: 1, color: "text.primary" }}
              >
                <Iconify icon="eva:menu-2-fill" />
              </IconButtonAnimate>
            </>
          )}
          {isAdmin ? (
            <>
              {isDesktop && (
                <>
                  <Tooltip title="products">
                    <IconButtonAnimate
                      LinkComponent={Link}
                      to={PATH_DASHBOARD.store.products}
                      sx={{ mr: 1, color: "text.disabled" }}
                    >
                      <Iconify icon="material-symbols:shopping-cart-outline" />
                    </IconButtonAnimate>
                  </Tooltip>

                  <Tooltip title="materials">
                    <IconButtonAnimate
                      LinkComponent={Link}
                      to={PATH_DASHBOARD.store.material}
                      sx={{ mr: 1, color: "text.disabled" }}
                    >
                      <Iconify icon="material-symbols:folder-outline" />
                    </IconButtonAnimate>
                  </Tooltip>
                  <Tooltip title="help center">
                    <IconButtonAnimate
                      LinkComponent={Link}
                      to={PATH_DASHBOARD.communication.help_center}
                      sx={{ mr: 1, color: "text.disabled" }}
                    >
                      <Iconify icon="bx:support" />
                    </IconButtonAnimate>
                  </Tooltip>
                  <Tooltip title="network settings">
                    <IconButtonAnimate
                      LinkComponent={Link}
                      to={PATH_DASHBOARD.settings.network.root}
                      sx={{ mr: 1, color: "text.disabled" }}
                    >
                      <Iconify icon="material-symbols:settings" />
                    </IconButtonAnimate>
                  </Tooltip>
                </>
              )}
            </>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            {!isDesktop && <QuickPopover />}

            <NotificationsPopover />

            <IconButtonAnimate onClick={() => handleOpenSettings()}>
              <Iconify icon="material-symbols:inbox-customize" />
            </IconButtonAnimate>
            <LanguagePopover />
            <AccountPopover />
          </Stack>
        </Toolbar>
      </RootStyle>

      <Settings handleClose={handleCloseSettings} open={openSettings} />
    </>
  );
}
