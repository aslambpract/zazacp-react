import axiosInstance from "src/utils/axios";
import { setSession } from "src/utils/jwt";

const impersonate = async (id) => {
  const URL = `/api/admin/impersonate/${id}`;
  try {
    const { status, data } = await axiosInstance(URL);
    return status === 200 ? data : false;
  } catch (err) {
    console.err(err);
    return false;
  }
};

const useImpersonate = (id) => {
  const onImpersonate = async () => {
    const {
      access_token,
      user,
      impersonate: isImpersonate,
    } = await impersonate(id);
    localStorage.setItem("isAdmin", Boolean(user.is_super_admin));
    localStorage.setItem("isSubAdmin", Boolean(user.is_sub_admin));
    localStorage.setItem("isImpersonate", Boolean(isImpersonate));
    sessionStorage.setItem("impersonationSource", window.location.pathname);
    setSession(access_token);
    window.location = window.origin;
  };

  return onImpersonate;
};

export default useImpersonate;
