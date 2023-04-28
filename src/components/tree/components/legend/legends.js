import Iconify from "src/components/Iconify";
import i18n from "src/locales/i18n"

const iconOne = { color: "#f73378", fontSize: "1.5em" };
const iconTwo = { color: "#ccc", fontSize: "1.5rem" };
const iconThree = { color: "#4caf50", fontSize: "1.5em" };
const iconFour = { color: "#2c387e", fontSize: "1.5em" };
const iconFive = { color: "#ed4b82", fontSize: "1.5em" };
const iconSix = { color: "#ccc", fontSize: "1.5em" };




const useLegends =()=>{
  return [
      {
        title:  i18n.t("adminGenealogy.binary.name") ,
        key: "name",
        icon: <Iconify icon="wpf:name" width={20} height={20} />,
      },
      {
        title:i18n.t("adminGenealogy.binary.userName") ,
        key: "username",
        icon: <Iconify icon="bxs:user" width={20} height={20} />,
      },
      {
        title:i18n.t("adminGenealogy.binary.currentRank") ,
        key: "rank",
        icon: <Iconify icon="fa6-solid:ranking-star" width={20} height={20} />,
      },
      {
        title:i18n.t("adminGenealogy.binary.date") ,
        key: "date",
        icon: <Iconify icon="ic:round-date-range" width={20} height={20} />,
      },
      {
        title:i18n.t("adminGenealogy.binary.weeklyBVl") ,
        key: "weeklyBvLeft",
        icon: <Iconify icon="bi:calendar-week-fill" width={20} height={20} />,
      },
      {
        title:i18n.t("adminGenealogy.binary.weeklyBVr"),
        key: "weeklyBvRight",
        icon: <Iconify icon="bi:calendar2-week-fill" width={20} height={20} />,
      },
      {
        title: i18n.t("adminGenealogy.binary.leftBV"),
        key: "leftCarry",
        icon: <Iconify icon="akar-icons:arrow-down-left" width={20} height={20} />,
      },
      {
        title: i18n.t("adminGenealogy.binary.rightBV"),
        key: "rightCarry",
        icon: <Iconify icon="akar-icons:arrow-down-right" width={20} height={20} />,
      },
      {
        title:i18n.t("adminGenealogy.binary.totalLeftUsers") ,
        key: "leftUsers",
        icon: (
          <Iconify icon="ant-design:arrow-left-outlined" width={20} height={20} />
        ),
      },
      {
        title: i18n.t("adminGenealogy.binary.totalRightUsers"),
        key: "rightUsers",
        icon: (
          <Iconify icon="ant-design:arrow-right-outlined" width={20} height={20} />
        ),
      },
    ];
  
  
}



export default useLegends;
