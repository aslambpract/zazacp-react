import { Grid } from "@mui/material";
import Cards from "./cards";
import i18n from "src/locales/i18n"
 
const Summary = ({ summary }) => {

const summaryCard = [
  {
    title: i18n.t("userFinancial.eWallet.balance ") ,
    icon: "arcticons:priceconverter",
    color: "#d279a6",
    key: "balance",
  },
  {
    title: i18n.t("userFinancial.eWallet.transferOut") ,
    icon: "bx:transfer-alt",
    color: "#6699ff",
    key: "transfer_out",
  },
  {
    title:i18n.t("userFinancial.eWallet.totalPayout")  ,
    icon: "fluent:wallet-48-regular",
    color: "#993366",
    key: "total_payout",
  },
  {
    title:i18n.t("userFinancial.eWallet.totalEarnedBonus")  ,
    icon: "carbon:ibm-cloud-pak-network-automation",
    color: "#999966",
    key: "total_earned_bonus",
  },
];
  return (
    <>
      {summaryCard.map((props) => (
        <Grid item xs={12} md={3}>
          <Cards {...props} total={summary[props.key]} />
        </Grid>
      ))}
    </>
  );
};


export default Summary;
