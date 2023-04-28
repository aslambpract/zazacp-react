import { Box, Button } from "@mui/material";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";

import { Dialog, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { AddForm } from "./form";
import useLocales from "src/hooks/useLocales";

const ArticleWrapper = ({ children, fetchCategoryList }) => {
  const { translate } = useLocales(); 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  const handleClickOpenCreateCategory = () => {
    setOpenCreateCategory(true);
  };

  const handleCloseCreateCategory = () => {
    setOpenCreateCategory(false);
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <>
      <div>
        <HeaderBreadcrumbs
          links={[{ name: translate("adminCommunication.articile.allCategories") }]}
          action={
            <>
              <Box
             
                sx={{
                  display: "grid",
                  columnGap: 1,
                  rowGap: 3,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                  },
                }}
              >
                <Button
                 {...buttonProps}
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                  onClick={handleClickOpenCreateCategory}
                >
                  {translate("adminCommunication.articile.articleCategory")} 
                </Button>
              </Box>
            </>
          }
        />
        {children}
      </div>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="add-article-category"
      >
        <AddForm
          fetchData={fetchCategoryList}
          onClose={handleCloseCreateCategory}
        />
      </Dialog>
    </>
  );
};

export default ArticleWrapper;
