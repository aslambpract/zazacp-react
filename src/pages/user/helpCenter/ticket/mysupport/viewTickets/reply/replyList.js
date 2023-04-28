import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import MyAvatar from "src/components/MyAvatar";
import ReactQuill from "react-quill";

const ReplyList = ({ data }) => {
  const { support_ticket_replies: replies } = data;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const modules = {
    toolbar: null,
  };

  return (
    <>
      <Card>
        <CardHeader
          disableTypography
          avatar={<MyAvatar />}
          title={
            <Link
              to="#"
              variant="subtitle2"
              color="text.primary"
              component={RouterLink}
            >
              {data.user?.username}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {new Date(data.created_at).toLocaleDateString("en-GB", options)}
            </Typography>
          }
          action={
            <IconButton>
              <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
            </IconButton>
          }
        />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Typography>{data.description}</Typography>

          {/* <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }} />
            <IconButton>
              <Iconify
                icon={"eva:message-square-fill"}
                width={20}
                height={20}
              />
            </IconButton>
            <IconButton>
              <Iconify icon={"eva:share-fill"} width={20} height={20} />
              <small> {data.support_ticket_replies_count} </small>
            </IconButton>
          </Stack> */}

          {replies?.map((data) => {
            const { body, user, created_at } = data;
            const date = new Date(created_at);
            const time = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            });
            const day = date.toLocaleDateString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const isSuperAdmin = Boolean(user.is_super_admin);

            return (
              <Stack spacing={1.5}>
                <Stack key="" direction="row" spacing={2}>
                  {!isSuperAdmin && <Avatar alt="sample" />}
                  <Paper
                    sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={{ sm: "center" }}
                      justifyContent="space-between"
                      sx={{ mb: 0.5 }}
                    >
                      {!isSuperAdmin && (
                        <Typography variant="subtitle2">
                          {user?.username}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ color: "text.disabled" }}
                      >
                        {day} - {time}
                      </Typography>
                      {isSuperAdmin && (
                        <Typography variant="subtitle2">
                          {user?.username}
                        </Typography>
                      )}
                    </Stack>

                    <ReactQuill
                      value={body}
                      theme="bubble"
                      modules={modules}
                      readOnly
                    />
                  </Paper>
                  {isSuperAdmin && <Avatar alt="sample" />}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Card>
    </>
  );
};

export default ReplyList;
