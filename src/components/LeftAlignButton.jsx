import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";

const LeftAlignButton = ({
  label,
  linkTo,
  icon,
  reset = () => null,
  isActive,
}) => {
  const { palette } = useTheme();
  const newStyle = isActive && {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    "&:hover": {
      backgroundColor: palette.primary.main,
    },
  };

  return (
    <Button
      disableRipple
      startIcon={<Iconify icon={icon} />}
      sx={{
        justifyContent: "flex-start",
        color: palette.text.disabled,
        paddingLeft: "1.3rem",
        "&:hover": {
          backgroundColor: "transparent",
        },
        ...newStyle,
      }}
      to={linkTo}
      onClick={reset}
      LinkComponent={Link}
    >
      {label}
    </Button>
  );
};

export default LeftAlignButton;
