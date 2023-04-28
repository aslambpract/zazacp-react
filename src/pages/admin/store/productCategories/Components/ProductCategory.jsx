import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Iconify from "src/components/Iconify";
import CustomSwitch from "./CustomSwitch";
import IconWrapperStyle from "./IconWrapperStyle";
import RootStyle from "./RootStyle";

export const trim = (arg = "") => {
  if (arg?.length < 20) return arg;

  return `${arg?.slice(0, 20)}...`;
};

const ProductCategory = ({
  item,
  color = "primary",
  openEdit,
  openDelete,
  changeStatus,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(Boolean(item.active));
  }, [item.active]);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <RootStyle
        sx={{
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
        }}
      >
        <IconWrapperStyle
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette[color].dark,
                0
              )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
          }}
        >
          <Iconify icon="carbon:product" width={50} height={50} />
        </IconWrapperStyle>
        <Typography variant="h4">{trim(item.name)}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Total Products : {item.products_count ?? "0"}
        </Typography>
        <Box>
          <Button
            type="submit"
            size="small"
            onClick={openEdit(item.id)}
            startIcon={<Iconify icon={"akar-icons:edit"} />}
          >
            Edit
          </Button>
          <Button
            type="submit"
            size="small"
            color="error"
            onClick={openDelete(item.id)}
            startIcon={<Iconify icon={"fluent:delete-20-regular"} />}
          >
            Delete
          </Button>
        </Box>
        <FormGroup>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <Typography>Enabled</Typography>
            <FormControlLabel
              control={
                <CustomSwitch
                  onChange={(e) => {
                    setIsActive(e.target.checked);
                    changeStatus(item.id);
                  }}
                  checked={isActive}
                />
              }
            />
            <Typography>Disabled</Typography>
          </Stack>
        </FormGroup>
      </RootStyle>
    </Grid>
  );
};

export default ProductCategory;
