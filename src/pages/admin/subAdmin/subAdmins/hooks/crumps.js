import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";



const useCrumps =()=>{
const { translate } = useLocales();
  return[
  { name: translate("dashboard"), href: PATH_DASHBOARD.root },
  { name: translate("adminSubAdmin.subAdmin.subAdmin"), href: PATH_DASHBOARD.subAdmin.sub_admins },
  { name:translate("adminSubAdmin.subAdmin.addSubAdmin")  },
];


}
export default useCrumps
