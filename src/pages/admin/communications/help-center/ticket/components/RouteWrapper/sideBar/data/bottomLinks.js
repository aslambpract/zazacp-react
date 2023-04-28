import i18n from "src/locales/i18n"
const useBottomLinks =()=>{
return [
  {
    primary:i18n.t("adminCommunication.helpCenter.departments") ,
    to: "test/department",
    icon: {
      icon: "gala:menu-left",
      color: "#4fc3f7",
    },
  },
  {
    primary: i18n.t("adminCommunication.helpCenter.categories"),
    to: "test/categories",
    icon: {
      icon: "bx:category",
      color: "#bdbdbd",
    },
  },
  {
    primary:i18n.t("adminCommunication.helpCenter.cannedResponses") ,
    to: "test/canned-responses",
    icon: {
      icon: "ooui:article-rtl",
      color: "#ffd600",
    },
  },
  {
    primary:i18n.t("adminCommunication.helpCenter.priority") ,
    to: "test/priorities",
    icon: {
      icon: "ant-design:issues-close-outlined",
      color: "#c51162",
    },
  },
];

}
export default useBottomLinks;
