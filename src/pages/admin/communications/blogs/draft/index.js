import { Link as RouterLink } from "react-router-dom";

import { Box, Button, Card } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";

const HeaderCrumps = () => {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Drafts"
        links={[
          { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Blog", href: PATH_DASHBOARD.communication.blog },
          { name: "Drafts" },
        ]}
      />
    </>
  );
};

export default HeaderCrumps;
