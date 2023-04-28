import Iconify from "src/components/Iconify";

import Document from "./documents/index";
import Video from "./videos/index";

import i18n from "src/locales/i18n"


const useTab=()=>{
return[
  {
    value:  i18n.t("adminStore.material.documents"),
    icon: <Iconify icon={"radix-icons:section"} width={20} height={20} />,
    component: <Document />,
  },
  {
    value:  i18n.t("adminStore.material.videos") ,
    icon: (
      <Iconify icon={"pixelarticons:article-multiple"} width={20} height={20} />
    ),
    component: <Video />,
  },
];
}
export default useTab;
