import { TreeWithLegend } from "src/components/tree";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import legends from "./legendItems";

const AdminBinaryTree = () => {
  const { translate } = useLocales();

  return (
    <TreeWithLegend
      title="Binary"
      url="api/admin/binarytree"
      legends={legends}
      links={[
        { name: translate("dashboard"), href: PATH_DASHBOARD.root },
        { name: translate("adminGenealogy.binary.binary") },
      ]}
    />
  );
};

export default AdminBinaryTree;
