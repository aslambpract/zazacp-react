import { useFormContext } from "react-hook-form";
import { AUTH_INFO, USE_LOGIN } from "src/config";
import AuthBanner from "./authBanner";

const AuthHelper = () => {
  const { reset } = useFormContext();
  const { admin, user } = AUTH_INFO;

  const selectCredentials = (info) => () => reset({ remember: true, ...info });

  return USE_LOGIN ? (
    <>
      <AuthBanner info={admin} onClick={selectCredentials(admin)} />
      <AuthBanner info={user} onClick={selectCredentials(user)} />
    </>
  ) : null;
};

export default AuthHelper;
