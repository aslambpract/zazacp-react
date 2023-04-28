import { Grid } from "@mui/material";
import Registered from "../widgets/Registered";
import RegisteredMembersWidget from "../widgets/RegisteredMembersWidget";
import useRegisterData from "./useRegisterData";

const RegisteredWidget = () => {
  const {
    members,
    holding_tank,
    network_members,
    business_builder_members,
    ...rest
  } = useRegisterData();

  return (
    <>
      <Grid item xs={12} md={12}>
        <RegisteredMembersWidget
          data={{
            members,
            holding_tank,
            network_members,
            business_builder_members,
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Registered {...rest} />
      </Grid>
    </>
  );
};

export default RegisteredWidget;
