import { TreeWithLegend } from "src/components/tree";
import useLocales from "src/hooks/useLocales";
import legends from "src/pages/admin/genealogy/binary/legendItems";
import { PATH_USER } from "src/routes/paths";

const UserBinaryTree = () => {
  const { translate } = useLocales();

  return (
    <TreeWithLegend
      url="api/user/binarytree"
      legends={legends}
      title={translate("userGenealogy.binary.binaryTitile")}
      links={[
        { name: translate("dashboard"), href: PATH_USER.root },
        { name: translate("adminGenealogy.binary.binary") },
      ]}
    />
  );
};

export default UserBinaryTree;
