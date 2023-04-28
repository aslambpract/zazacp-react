import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useResponsive from "src/hooks/useResponsive";
import { PATH_AUTH } from "src/routes/paths";

const GetStartedTitle = () => {
  const smUp = useResponsive("up", "sm");

  return (
    smUp && (
      <Typography variant="body2" sx={{ mt: { md: -2 } }}>
        Don’t have an account &nbsp;? &nbsp;&nbsp;
        <Link
          variant="subtitle2"
          component={RouterLink}
          to={PATH_AUTH.register}
        >
          Get started
        </Link>
      </Typography>
    )
  );
};

export default GetStartedTitle;
