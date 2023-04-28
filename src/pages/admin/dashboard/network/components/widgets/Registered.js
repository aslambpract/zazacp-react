import { Box, Card, CardHeader, Typography } from "@mui/material";
import MembersWidget from "./MembersWidget";
import useLocales from "src/hooks/useLocales";



const Registered = (props) => {
  const { translate } = useLocales();
  const {
    members_yesterday,
    members_this_month,
    holding_tank_yesterday,
    holding_tank_this_month,
    network_members_yesterday,
    network_members_this_month,
  } = props;
  return (
    <>
      <Card>
        <CardHeader
          title={
            <>
              <Typography
                variant="subtitle2"
                paragraph
                sx={{ color: "text.secondary", marginBottom: 0 }}
              >
                Registered Members Yesterday
              </Typography>
            </>
          }
          subheader={
            <>
              <Typography variant="h5">{members_yesterday}</Typography>
            </>
          }
        />

        <Box
          sx={{
            display: "grid",
            rowGap: 2,
            columnGap: 2,
            padding: 2,
            marginTop: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Box>
            <MembersWidget
              title={translate("adminDashboard.network.holdingTank")} 
              count={holding_tank_yesterday}
              color="warning"
            />
          </Box>
          <Box>
            <MembersWidget
              title={translate("adminDashboard.network.networkMembers")} 
              count={network_members_yesterday}
              color="secondary"
            />
          </Box>
        </Box>

        <CardHeader
          title={
            <>
              <Typography
                variant="subtitle2"
                paragraph
                sx={{ color: "text.secondary", marginBottom: 0 }}
              >
               {translate("adminDashboard.network.registeredMembersThisMonth")} 
              </Typography>
            </>
          }
          subheader={
            <>
              <Typography variant="h5">{members_this_month}</Typography>
            </>
          }
        />

        <Box
          sx={{
            display: "grid",
            rowGap: 2,
            columnGap: 2,
            padding: 2,
            marginTop: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Box>
            <MembersWidget
              title={translate("adminDashboard.network.holdingTank")}
              count={holding_tank_this_month}
              color="warning"
            />
          </Box>
          <Box>
            <MembersWidget
              title={translate("adminDashboard.network.networkMembers")} 
              count={network_members_this_month}
              color="secondary"
            />
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Registered;
