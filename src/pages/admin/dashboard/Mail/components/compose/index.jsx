import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Divider,
  IconButton,
  Portal,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FormProvider, RHFEditor } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import useUsersList from "src/components/UsersAutoComplete/hooks/useUsersList";
import useLocales from "src/hooks/useLocales";
import useResponsive from "src/hooks/useResponsive";
import Styles from "../style.module.css";
import InputStyle from "./components/inputStyle";
import RootStyle from "./components/rootStyle";
import useCompose from "./hooks/useCompose";

const Compose = () => {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);

  const usersList = useUsersList();
  const attachmentsRef = useRef(null);

  const [fullScreen, setFullScreen] = useState(false);

  const isDesktop = useResponsive("up", "sm");

  const handleExitFullScreen = () => {
    setFullScreen(false);
  };

  const handleEnterFullScreen = () => {
    setFullScreen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFullScreen(false);
  };

  const { methods, onSubmit } = useCompose();

  const { ref, ...rest } = methods.register("attachments");

  const openAttachments = () => attachmentsRef.current.click();

  const attachments = methods.watch("attachments");

  const removeAttachments = (i) => () => {
    const newAttachments = [...attachments];
    newAttachments.splice(i, 1);
    methods.setValue("attachments", newAttachments);
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          onClick={() => {
            setOpen(true);
          }}
        >
          {translate("adminCommunication.mail.compose")}
        </Button>
      </Box>
      {open && (
        <Portal>
          <Backdrop open={fullScreen || !isDesktop} sx={{ zIndex: 1998 }} />
          <RootStyle
            sx={{
              ...(fullScreen && {
                top: 0,
                left: 0,

                margin: "auto",
                width: {
                  xs: `calc(100% - 24px)`,
                  md: `calc(100% - 80px)`,
                },
                height: {
                  xs: `calc(100% - 24px)`,
                  md: `calc(100% - 80px)`,
                },
              }),
            }}
            className={Styles.userInput}
          >
            <Box
              sx={{
                pl: 3,
                pr: 1,
                height: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                {translate("adminCommunication.mail.newMessage")}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />

              <IconButton
                onClick={
                  fullScreen ? handleExitFullScreen : handleEnterFullScreen
                }
              >
                <Iconify
                  icon={fullScreen ? "eva:collapse-fill" : "eva:expand-fill"}
                  width={20}
                  height={20}
                />
              </IconButton>

              <IconButton onClick={handleClose}>
                <Iconify icon={"eva:close-fill"} width={20} height={20} />
              </IconButton>
            </Box>
            <Divider />

            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Autocomplete
                multiple
                options={usersList}
                onChange={(_, v) =>
                  methods.setValue(
                    "to_users_id",
                    v.map(({ user_id }) => user_id)
                  )
                }
                getOptionLabel={(option) => option.username}
                renderInput={(params) => (
                  <TextField
                    label={translate("adminCommunication.mail.users")}
                    {...params}
                  />
                )}
              />
              <InputStyle
                {...methods.register("subject")}
                disableUnderline
                placeholder={translate("adminCommunication.mail.subject")}
              />

              <RHFEditor
                name="message"
                simple
                id="compose-mail"
                placeholder={translate("adminCommunication.mail.typeMessage")}
                sx={{
                  borderColor: "transparent",
                  flexGrow: 1,
                }}
              />

              {[...attachments].map(({ name, size }, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "75%",
                    padding: "0.8rem",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>{name}</div>
                    <div>{size}</div>
                  </div>
                  <IconButton size="small" onClick={removeAttachments(i)}>
                    <Iconify icon="eva:close-fill" />
                  </IconButton>
                </Box>
              ))}

              <Divider />
              <Box sx={{ py: 2, px: 3, display: "flex", alignItems: "center" }}>
                <Button type="submit" variant="contained">
                  {translate("adminCommunication.mail.send")}
                </Button>

                <input
                  {...rest}
                  ref={(e) => {
                    ref(e);
                    attachmentsRef.current = e;
                  }}
                  type="file"
                  style={{ display: "none" }}
                />
                <IconButton
                  onClick={openAttachments}
                  size="small"
                  sx={{ ml: 2, mr: 1 }}
                >
                  <Iconify icon={"eva:attach-2-fill"} width={24} height={24} />
                </IconButton>
              </Box>
            </FormProvider>
          </RootStyle>
        </Portal>
      )}
    </>
  );
};

Compose.propTypes = {
  isOpenCompose: PropTypes.bool,
  onCloseCompose: PropTypes.func,
};

export default Compose;
