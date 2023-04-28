import { Card, CardHeader } from "@mui/material";
import useLocales from "src/hooks/useLocales";

const UserList = ({ children }) =>{
  const { translate } = useLocales();
  return(
    <Card>
      <CardHeader title={translate("adminStore.assignSubscriptions.subscriptionsList")}  sx={{ mb: 3 }} />
      {children}
    </Card>
  );
}
export default UserList;
