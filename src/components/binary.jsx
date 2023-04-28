import { Navigate } from "react-router";
import { isBinary, isNotBinary } from "src/utils/isBinary";

export const BinaryCheck = ({ children }) => {
  if (isNotBinary()) {
    return <Navigate to="/404" replace />;
  }
  return children;
};

export const NotBinary = ({ children }) => {
  if (isBinary()) {
    return <Navigate to="/404" replace />;
  }
  return children;
};
