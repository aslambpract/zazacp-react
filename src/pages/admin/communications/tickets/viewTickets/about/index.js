import React from "react";
import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Card, Typography, CardHeader, Stack } from "@mui/material";
// components
import Iconify from "src/components/Iconify";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

const Index = () => {
  return (
    <div>
      <Card>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row">
            <IconStyle icon={"pajamas:status"} />
            <Typography variant="body2">
              Status &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                Open
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"material-symbols:priority"} />
            <Typography variant="body2">
              Priority &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                low
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"bxs:category"} />
            <Typography variant="body2">
              Department &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                Finance
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"dashicons:email-alt"} />
            <Typography variant="body2">
              Email &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                shibi@bpract.com
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"ic:baseline-category"} />
            <Typography variant="body2">
              Category &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                Bug
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"bxs:user-pin"} />
            <Typography variant="body2">
              Username &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                shibi123
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"ant-design:message-filled"} />
            <Typography variant="body2">
              Last Message &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                12 mint
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default Index;
