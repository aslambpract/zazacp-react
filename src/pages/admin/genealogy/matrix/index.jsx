import { TreeWithLegend } from "src/components/tree";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import legends from "./legendItems";

const AdminMatrixTree = () => {
  const { translate } = useLocales();

  return (
    <TreeWithLegend
      title="Matrix"
      url="api/admin/binarytree"
      legends={legends}
      links={[
        { name: translate("dashboard"), href: PATH_DASHBOARD.root },
        { name: translate("matrix") },
      ]}
    />
  );
};

export default AdminMatrixTree;
