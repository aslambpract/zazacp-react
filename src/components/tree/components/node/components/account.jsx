import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar, Card, CardHeader, useTheme } from "@mui/material";
import { useDrag } from "react-dnd";
import useStyles from "../hooks/useStyles";

const Account = ({ name, profile, onClick }) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const [{ isDragging }, drag] = useDrag({
    type: "account",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <Card
        onClick={onClick}
        variant="outlined"
        className={classes.root}
        ref={drag}
        style={{ cursor: "pointer", opacity }}
      >
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              src={profile}
              sx={{ backgroundColor: palette.primary.lighter }}
            >
              <AccountCircleOutlinedIcon sx={{ color: palette.primary.main }} />
            </Avatar>
          }
          title={name ? name : "no name"}
        />
      </Card>
    </>
  );
};
export default Account;
