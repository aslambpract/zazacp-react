// @mui
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import useDelete from "../../hook/useDelete";
import DeleteProductDialog from "./DeleteProductDialog";

const useStyles = makeStyles({
  buttonVideo: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
  buttonDocument: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#ff9100",
    },
  },
  buttonQuestions: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#00a152",
    },
  },
  buttonSampleDoc: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#ab003c",
    },
  },
});

const Actions = ({ data, refresh }) => {
  const { translate } = useLocales();
  const { closeDelete, itemId, openDelete } = useDelete();
  const classes = useStyles();
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {!isDesktop && (
        <CardActions disableSpacing sx={{ float: "right", columnGap: "1rem" }}>
          <Tooltip title={translate("adminStore.products.videoView_edit")}>
            <IconButton
              aria-label="videos"
              className={classes.buttonVideo}
              component={RouterLink}
              sx={{ color: palette.primary.main, backgroundColor: "#f1f1f1a8" }}
              to={`${PATH_DASHBOARD.store.products}/${data.id}/video`}
            >
              <Iconify icon={"akar-icons:video"} />
            </IconButton>
          </Tooltip>
          <Tooltip title={translate("adminStore.products.documentView_Edit")}>
            <IconButton
              aria-label="documents"
              className={classes.buttonDocument}
              state={{ productDocuments: data.product_docs }}
              component={RouterLink}
              sx={{ color: palette.primary.main, backgroundColor: "#f1f1f1a8" }}
              to={`${PATH_DASHBOARD.store.products}/${data.id}/document`}
            >
              <Iconify icon={"clarity:document-line"} />
            </IconButton>
          </Tooltip>
          <Tooltip title={translate("adminStore.products.questionsView_Edit")}>
            <IconButton
              aria-label="questions"
              className={classes.buttonQuestions}
              component={RouterLink}
              sx={{ color: palette.primary.main, backgroundColor: "#f1f1f1a8" }}
              state={{ questions: data.product_questions }}
              to={`${PATH_DASHBOARD.store.products}/${data.id}/questions`}
            >
              <Iconify icon={"akar-icons:chat-question"} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={translate("adminStore.products.sampleDocumentView_Edit")}
          >
            <IconButton
              aria-label="product_edit"
              className={classes.buttonSampleDoc}
              component={RouterLink}
              sx={{ color: palette.primary.main, backgroundColor: "#f1f1f1a8" }}
              to={`${PATH_DASHBOARD.store.products}/${data.id}/sample`}
            >
              <Iconify icon={"healthicons:i-documents-accepted-outline"} />
            </IconButton>
          </Tooltip>

          <Tooltip title={translate("adminStore.products.productView_Edit")}>
            <IconButton
              aria-label="product_edit"
              component={RouterLink}
              sx={{ color: palette.primary.main, backgroundColor: "#f1f1f1a8" }}
              to={`${PATH_DASHBOARD.store.product_edit}/${data.id}`}
            >
              <Iconify icon={"akar-icons:edit"} />
            </IconButton>
          </Tooltip>

          <Tooltip title={translate("adminStore.products.delete")}>
            <IconButton
              aria-label="settings"
              color="error"
              onClick={openDelete(data.id)}
              sx={{ backgroundColor: "#f1f1f1a8" }}
            >
              <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
      {isDesktop && (
        <>
          <Box sx={{ alignItems: "right", textAlign: "right" }}>
            <Tooltip title="Product">
              <IconButton
                onClick={handleClick}
                size="medium"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <IconButton
                  aria-label="videos"
                  size="small"
                  sx={{
                    color: palette.primary.main,
                    backgroundColor: "#eae6e6",
                  }}
                >
                  <Iconify
                    icon="ph:dots-three-vertical-bold"
                    style={{ color: "#514b4b" }}
                  />
                </IconButton>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Tooltip title={translate("adminStore.products.videoView_edit")}>
                <IconButton
                  aria-label="videos"
                  className={classes.buttonVideo}
                  component={RouterLink}
                  sx={{
                    color: palette.primary.main,
                    backgroundColor: "#f1f1f1a8",
                  }}
                  to={`${PATH_DASHBOARD.store.products}/${data.id}/video`}
                >
                  <Iconify icon={"akar-icons:video"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip
                title={translate("adminStore.products.documentView_Edit")}
              >
                <IconButton
                  aria-label="documents"
                  className={classes.buttonDocument}
                  state={{ productDocuments: data.product_docs }}
                  component={RouterLink}
                  sx={{
                    color: palette.primary.main,
                    backgroundColor: "#f1f1f1a8",
                  }}
                  to={`${PATH_DASHBOARD.store.products}/${data.id}/document`}
                >
                  <Iconify icon={"clarity:document-line"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip
                title={translate("adminStore.products.questionsView_Edit")}
              >
                <IconButton
                  aria-label="questions"
                  className={classes.buttonQuestions}
                  component={RouterLink}
                  sx={{
                    color: palette.primary.main,
                    backgroundColor: "#f1f1f1a8",
                  }}
                  state={{ questions: data.product_questions }}
                  to={`${PATH_DASHBOARD.store.products}/${data.id}/questions`}
                >
                  <Iconify icon={"akar-icons:chat-question"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip
                title={translate("adminStore.products.sampleDocumentView_Edit")}
              >
                <IconButton
                  aria-label="product_edit"
                  className={classes.buttonSampleDoc}
                  component={RouterLink}
                  sx={{
                    color: palette.primary.main,
                    backgroundColor: "#f1f1f1a8",
                  }}
                  to={`${PATH_DASHBOARD.store.products}/${data.id}/sample`}
                >
                  <Iconify icon={"healthicons:i-documents-accepted-outline"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip
                title={translate("adminStore.products.productView_Edit")}
              >
                <IconButton
                  aria-label="product_edit"
                  component={RouterLink}
                  sx={{
                    color: palette.primary.main,
                    backgroundColor: "#f1f1f1a8",
                  }}
                  to={`${PATH_DASHBOARD.store.product_edit}/${data.id}`}
                >
                  <Iconify icon={"akar-icons:edit"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip title={translate("adminStore.products.delete")}>
                <IconButton
                  aria-label="settings"
                  color="error"
                  onClick={openDelete(data.id)}
                  sx={{ backgroundColor: "#f1f1f1a8" }}
                >
                  <Iconify icon={"eva:trash-2-outline"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
          </Menu>
        </>
      )}

      <DeleteProductDialog
        itemId={itemId}
        onClose={closeDelete}
        refresh={refresh}
      />
    </>
  );
};
export default Actions;
