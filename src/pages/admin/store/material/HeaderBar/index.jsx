import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import { PATH_DASHBOARD } from "src/routes/paths";
import useMediaQuery from "@mui/material/useMediaQuery";
import useLocales from "src/hooks/useLocales";

const HeaderBarActions = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 1,
        rowGap: 3,
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
        },
      }}
    >
      <Button
        {...buttonProps}
        variant="contained"
        startIcon={<Iconify icon={"eva:plus-fill"} />}
        component={RouterLink}
        to={PATH_DASHBOARD.store.material_add}
      >
        {translate("adminStore.material.material")}
      </Button>
      <Button
        {...buttonProps}
        variant="contained"
        startIcon={<Iconify icon={"eva:plus-fill"} />}
        component={RouterLink}
        to={PATH_DASHBOARD.store.material_categories}
      >
        {translate("adminStore.material.materialCategories")}
      </Button>
    </Box>
  );
};

const HeaderBar = () => {
  const { translate } = useLocales();
  const links = [
    { name: translate("dashboard"), href: PATH_DASHBOARD.root },
    { name: translate("adminStore.material.materials") },
  ];
  return (
    <HeaderBreadcrumbs
      heading={translate("adminStore.material.material")}
      links={links}
      action={<HeaderBarActions />}
    />
  );
};

export default HeaderBar;
