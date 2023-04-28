import { Button, Stack, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_USER } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";


const ActionButton = ({ icon, color, label, href, variant }) => {
  const { palette } = useTheme();
  const { mode } = palette;

  return (
    <Tooltip title={label}>
      <Button
        LinkComponent={Link}
        to={href}
        startIcon={<Iconify icon={icon} />}
        variant={variant}
        size="small"
        sx={{
          color: color[mode],
          borderColor: color[mode],
          "&:hover": {
            backgroundColor: `${color[mode]}10`,
            borderColor: color[mode],
          },
        }}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  href: PropTypes.string,
  isFirst: PropTypes.bool.isRequired,
};

export default ({ id, product_id }) => {
  const { translate } = useLocales();
  const view = PATH_USER.subscriptions.view(id);

  const actionButtons = [
    {
      icon: "bi:check-lg",
      label:  translate("userMySubscriptions.addReview"),
      color: { light: "#00c853", dark: "#69f0ae" },
      href: PATH_USER.subscriptions.view(product_id)("comment"),
      variant: "outlined",
    },
    {
      icon: "akar-icons:link-chain",
      label: translate("userMySubscriptions.blog") ,
      color: { light: "#0091ea", dark: "#40c4ff" },
      href: `${PATH_USER.subscriptions.blog(product_id)}`,
      variant: "outlined",
    },
    {
      icon: "uil:calender",
      label:  translate("userMySubscriptions.events"),
      color: { light: "#25223e", dark: "#eeff41" },
      href: PATH_USER.subscriptions.view(product_id)("events"),
      variant: "outlined",
    },
    {
      icon: "healthicons:i-documents-accepted-outline",
      label:  translate("userMySubscriptions.documents"),
      color: { light: "#d50000", dark: "#ff4081" },
      href: PATH_USER.subscriptions.view(product_id)("documents"),
      variant: "outlined",
    },
    {
      icon: "akar-icons:play",
      label:  translate("userMySubscriptions.video"),
      color: { light: "#ff6d00", dark: "#ffd740" },
      href: PATH_USER.subscriptions.view(product_id)("videos"),
      variant: "outlined",
    },
    {
      icon: "carbon:view",
      label:  translate("userMySubscriptions.view"),
      color: "",
      href: view("home"),
      variant: "contained",
    },
  ];

  return (
    <Stack spacing={1} direction="row">
      {actionButtons.map((v) => (
        <ActionButton {...v} />
      ))}
    </Stack>
  );
};
