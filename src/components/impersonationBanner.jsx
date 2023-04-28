import { Alert } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";
import fetchUser from "src/utils/fetchUser";
import { setSession } from "src/utils/jwt";

const ImpersonationBanner = () => {
  const { translate } = useLocales();
  const { user } = useAuth();
  const isImpersonate = localStorage.getItem("isImpersonate");
  const goBackToAdmin = async () => {
    try {
      const {
        status,
        data: { access_token },
      } = await fetchUser.get("back-to-admin");
      if (status === 200) {
        localStorage.setItem("isAdmin", true);
        localStorage.removeItem("isSubAdmin");
        localStorage.removeItem("isImpersonate");
        setSession(access_token);
        window.location = `${window.origin}${sessionStorage.getItem(
          "impersonationSource"
        )}`;
      }
    } catch (err) {
      console.error(err);
    }
  };
  return isImpersonate ? (
    <Alert severity="info">
      {translate("impoersonation.heads")} {user.username}{" "}
      <strong
        onClick={goBackToAdmin}
        style={{
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {translate("impoersonation.click")}
      </strong>{" "}
      ,{translate("impoersonation.toGo")}
    </Alert>
  ) : null;
};

export default ImpersonationBanner;
