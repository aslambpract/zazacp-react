import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { PATH_DASHBOARD } from "src/routes/paths";

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
