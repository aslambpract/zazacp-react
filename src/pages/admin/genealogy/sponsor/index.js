import { TreeWithoutLegend } from "src/components/tree";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";

const AdminSponsorTree = () => {
  const { translate } = useLocales();

  return (
    <TreeWithoutLegend
      url="api/admin/sponsortree"
      title="adminGenealogy.sponsor.sponsorTitile"
      links={[
        { name: translate("dashboard"), href: PATH_DASHBOARD.root },
        { name: translate("adminGenealogy.sponsor.sponsor") },
      ]}
    />
  );
};

export default AdminSponsorTree;
