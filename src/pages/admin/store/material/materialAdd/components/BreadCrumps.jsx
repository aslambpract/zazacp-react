import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";


const BreadCrumps = () =>{
  const { translate } = useLocales();
  return (
    <HeaderBreadcrumbs
      heading={translate("adminStore.material.addMaterial") }
      links={[
        { name: translate("dashboard"), href: PATH_DASHBOARD.root },
        { name: translate("adminStore.material.materials"), href: PATH_DASHBOARD.store.material },
        { name: translate("adminStore.material.add")},
      ]}
    />
  );
}
export default BreadCrumps;
