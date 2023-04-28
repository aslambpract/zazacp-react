import { Box, Card, CardHeader, Typography } from "@mui/material";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";
import MembersWidget from "./MembersWidget";

export default function RegisteredMembersWidget({ data }) {
  const { translate } = useLocales();
  const { members, holding_tank, network_members, business_builder_members } =
    data;
  return (
    <Card>
      <CardHeader
        title={
          <>
            <Typography
              variant="subtitle2"
              paragraph
              sx={{ color: "text.secondary", marginBottom: 0 }}
            >
              {translate("adminDashboard.network.registeredMembers")}
            </Typography>
          </>
        }
        subheader={
          <>
            <Typography variant="h5">{members}</Typography>
          </>
        }
      />

      <Box
        sx={{
          display: "grid",
          rowGap: 2,
          columnGap: 2,
          padding: 2,
          marginTop: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
          },
        }}
      >
        <Box>
          <MembersWidget
            title={translate("adminDashboard.network.holdingTank")}
            count={holding_tank}
            color="warning"
          />
        </Box>
        <Box>
          <MembersWidget
            title={translate("adminDashboard.network.networkMembers")}
            count={network_members}
            color="secondary"
          />
        </Box>

        <Box>
          {isBinary() && (
            <MembersWidget
              title={translate("adminDashboard.network.businessBuilder")}
              count={business_builder_members}
              color="primary"
            />
          )}
        </Box>
      </Box>
    </Card>
  );
}
