import { TreeWithLegend } from "src/components/tree";
import useLocales from "src/hooks/useLocales";
import legends from "src/pages/admin/genealogy/matrix/legendItems";
import { PATH_USER } from "src/routes/paths";

const UserMatrixTree = () => {
  const { translate } = useLocales();

  return (
    <TreeWithLegend
      url="api/user/binarytree"
      legends={legends}
      title={translate("matrix")}
      links={[
        { name: translate("dashboard"), href: PATH_USER.root },
        { name: translate("matrix") },
      ]}
    />
  );
};

export default UserMatrixTree;
