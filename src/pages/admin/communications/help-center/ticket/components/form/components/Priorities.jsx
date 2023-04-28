import React from "react";
import { RHFSelect } from "src/components/hook-form";
import usePriorities from "../../../prioritys/hooks/usePriorities";
import useLocales from "src/hooks/useLocales";

const Priorities = () => {
  const { translate } = useLocales();
  const { priorities } = usePriorities();
  return (
    <RHFSelect name="priority_id" label={translate("adminCommunication.helpCenter.priority")}>
      <option value="" />
      {priorities.map(({ id, name, color }) => (
        <option
          value={id}
          style={{
            backgroundColor: color,
          }}
        >
          {name}
        </option>
      ))}
    </RHFSelect>
  );
};

export default Priorities;
