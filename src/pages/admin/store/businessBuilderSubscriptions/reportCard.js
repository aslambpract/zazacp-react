import { Grid } from "@mui/material";
import { BookingIllustration } from "src/assets";
import SingleCard from "./singleCard";
import useLocales from "src/hooks/useLocales";


const ReportCard = ({ data }) => {
  const { translate } = useLocales();
  const { recurringCancelledCount, recurringCount, totalAmount, thisWeek } =
    data;
  return (
    <>
      <Grid item xs={12} md={8}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <SingleCard
              title={translate("adminStore.businessBuilder.totalAmount")}
              total={totalAmount}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <SingleCard
              title={translate("adminStore.businessBuilder.recurringEnabled")}
              total={recurringCancelledCount}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <SingleCard
              title={translate("adminStore.businessBuilder.recurringCancelled")}
              total={recurringCount}
              icon={<BookingIllustration />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SingleCard
              title={translate("adminStore.businessBuilder.thisWeekEnd")}
              total={thisWeek}
              icon={<BookingIllustration />}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportCard;
