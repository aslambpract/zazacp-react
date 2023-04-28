import { PATH_DASHBOARD } from "src/routes/paths";
import i18n from "src/locales/i18n"

const useTopLinks =()=>{
return [
  {
    primary: i18n.t("adminCommunication.helpCenter.ticketsDashboard")  ,
    to: PATH_DASHBOARD.communication.help_center_tickets,
    icon: {
      icon: "ic:round-dashboard",
      color: "#009688",
    },
  },
  {
    primary:  i18n.t("adminCommunication.helpCenter.allTickets") ,
    to: "all",
    icon: {
      icon: "bi:ticket-perforated",
      color: "#ffc107",
    },
  },
  {
    primary:  i18n.t("adminCommunication.helpCenter.overdue") ,
    to: "overdue",
    icon: {
      icon: "healthicons:i-schedule-school-date-time",
      color: "#ff5722",
    },
  },
  {
    primary:  i18n.t("adminCommunication.helpCenter.open") ,
    to: "open",
    icon: {
      icon: "ant-design:folder-open-outlined",
      color: "#795548",
    },
  },
  {
    primary:  i18n.t("adminCommunication.helpCenter.resolved") ,
    to: "resolved",
    icon: {
      icon: "el:ok-circle",
      color: "#4caf50",
    },
  },
  {
    primary:  i18n.t("adminCommunication.helpCenter.closed") ,
    to: "closed",
    icon: {
      icon: "ant-design:close-circle-outlined",
      color: "#f44336",
    },
  },
  {
    primary: i18n.t("adminCommunication.helpCenter.inProgress")  ,
    to: "inprogress",
    icon: {
      icon: "quill:loading-spin",
      color: "#00e676",
    },
  },
  {
    primary: i18n.t("adminCommunication.helpCenter.responded")  ,
    to: "responded",
    icon: {
      icon: "carbon:list-boxes",
      color: "#651fff",
    },
  },
];
}
export default useTopLinks;

