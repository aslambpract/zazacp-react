import { PATH_DASHBOARD } from "src/routes/paths";

import { TreeWithoutLegend } from "src/components/tree";
import useLocales from "src/hooks/useLocales";

const UserSponsorTree = () => {
  const { translate } = useLocales();

  return (
    <TreeWithoutLegend
      url="api/user/sponsortree"
      title={translate("userGenealogy.sponser.SponsorTitile")}
      links={[
        { name: translate("dashboard"), href: PATH_DASHBOARD.root },
        { name: translate("userGenealogy.sponser.sponsor") },
      ]}
    />
  );
};

export default UserSponsorTree;
