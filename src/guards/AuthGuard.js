import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PATH_DASHBOARD } from "src/routes/paths";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import Login from "../pages/auth/Login";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}

export const AdminGuard = ({ children }) => {
  const { isAdmin, isSubAdmin } = useAuth();
  if (isAdmin || isSubAdmin) {
    return <>{children}</>;
  }
  return <Navigate to="/user" />;
};

export const SubAdminGuard = ({ children }) => {
  const { isSubAdmin } = useAuth();

  if (isSubAdmin) {
    return <Navigate to={PATH_DASHBOARD.dashboard.root} />;
  }

  return <>{children}</>;
};

export const UserGuard = ({ children }) => {
  const { isAdmin, isSubAdmin } = useAuth();
  if (isAdmin || isSubAdmin) {
    return <Navigate to="/admin" />;
  }

  return <>{children};</>;
};
