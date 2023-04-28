import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
// hooks
import useAuth from "src/hooks/useAuth";
// utils
import { fDate } from "src/utils/formatTime";
import { fShortenNumber } from "src/utils/formatNumber";
// components
import Image from "src/components/Image";
import Iconify from "src/components/Iconify";
import MyAvatar from "src/components/MyAvatar";
import EmojiPicker from "src/components/EmojiPicker";

// ----------------------------------------------------------------------

const ReplyList = () => {
  return (
    <div>
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
              shibi
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              march 12 2022 - 03:29am
            </Typography>
          }
          action={
            <IconButton>
              <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
            </IconButton>
          }
        />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Typography>
            lorem an publishing and graphic design, Lorem ipsum is a placeholder
            text commonly used to demonstrate the visual form of a
          </Typography>

          {/* <Image
            alt="post media"
            src="https://minimal-assets-api.vercel.app/assets/images/feeds/feed_1.jpg"
            ratio="16/9"
            sx={{ borderRadius: 1 }}
          /> */}

          <Stack direction="row" alignItems="center">
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
            </IconButton>
          </Stack>

          <Stack spacing={1.5}>
            <Stack key="" direction="row" spacing={2}>
              <Avatar
                alt="sample"
                src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg"
              />
              <Paper
                sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ sm: "center" }}
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="subtitle2">shibi bpract</Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    may 6 2023 - 9:03 pm
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Reference site about Lorem Ipsum, giving information on its
                  origins, as well as a random Lipsum generator.
                </Typography>
              </Paper>
            </Stack>
          </Stack>
          <Stack spacing={1.5}>
            <Stack key="" direction="row" spacing={2}>
              <Paper
                sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ sm: "center" }}
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    may 6 2023 - 9:03 pm
                  </Typography>
                  <Typography variant="subtitle2">Rajesh bpract</Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    float: "right",
                    textAlign: "right",
                  }}
                >
                  hi demonstrate the visual form of a document or a typeface
                  without relying on meaningful content
                </Typography>
              </Paper>
              <Avatar
                alt="sample"
                src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_10.jpg"
              />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default ReplyList;
