import React from "react";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";

const TableHeader = () => {
  const { translate } = useLocales();
  {
    translate("adminSettings.network.update");
  }
  const binaryMode = isBinary();
  return (
    <thead>
      <tr>
        <th className=""></th>
        <th colspan={binaryMode ? "3" : "2"}>
          {translate("adminSettings.network.condition")} 01
        </th>
        <th colspan={binaryMode ? "3" : "2"}>
          {translate("adminSettings.network.condition")} 02
        </th>
        <th colspan={binaryMode ? "3" : "2"}>
          {translate("adminSettings.network.condition")} 03
        </th>
        <th colspan={binaryMode ? "3" : "2"}>
          {translate("adminSettings.network.condition")} 04
        </th>
        <th colspan="2">{translate("adminSettings.network.condition")} 05</th>
      </tr>
      <tr>
        <th className="">{translate("adminSettings.network.rankName")}</th>
        <th>{translate("adminSettings.network.personallyEnrolledRank")}</th>
        <th>{translate("adminSettings.network.count")}</th>
        {binaryMode && <th>{translate("adminSettings.network.leg")}</th>}
        <th>{translate("adminSettings.network.personalEnrolledRank")}</th>
        <th>{translate("adminSettings.network.count")}</th>
        {binaryMode && <th>{translate("adminSettings.network.leg")}</th>}
        <th>{translate("adminSettings.network.personalEnrolledRank")}</th>
        <th>{translate("adminSettings.network.count")}</th>
        {binaryMode && <th>{translate("adminSettings.network.leg")}</th>}
        <th>{translate("adminSettings.network.personalEnrolledRank")}</th>
        <th>{translate("adminSettings.network.count")}</th>
        {binaryMode && <th>{translate("adminSettings.network.leg")}</th>}
        <th>{translate("adminSettings.network.teamVolume")}</th>
        <th>{translate("adminSettings.network.consecutiveWeek")}</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
