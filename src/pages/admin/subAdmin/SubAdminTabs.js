import Iconify from "src/components/Iconify";

import Active from "./active/index";
import Inactive from "./inactive/index";
import Trashed from "./trashed/index";
import useLocales from "src/hooks/useLocales";



const useSubAdminTabs =()=>{
  const { translate } = useLocales();
return[
  {
    key: "active_sub_admins",
    value: translate("adminSubAdmin.subAdmin.active"),
    icon: (
      <Iconify icon={"carbon:intent-request-active"} width={20} height={20} />
    ),
    component: (data, fetchData) => {
      return <Active data={data} fetchData={fetchData} />;
    },
  },
  {
    key: "inactive_sub_admins",
    value: translate("adminSubAdmin.subAdmin.inactive"),
    icon: (
      <Iconify icon={"carbon:intent-request-inactive"} width={20} height={20} />
    ),
    component: (data, fetchData) => {
      return <Inactive data={data} fetchData={fetchData} />;
    },
  },
  {
    key: "trashed_sub_admins",
    value: translate("adminSubAdmin.subAdmin.trashed"),
    icon: <Iconify icon={"akar-icons:trash-can"} width={20} height={20} />,
    component: (data, fetchData) => (
      <Trashed data={data} fetchData={fetchData} />
    ),
  },
];

}
export default useSubAdminTabs;


