import React from "react";
import { RHFSelect } from "src/components/hook-form";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { countries } from "./countries";

const Countries = () => {
  const { translate } = useLocales();
  return (
    <RHFSelect name="country" label={translate("userProfile.countryS")}>
      <option value="">--Choose Country--</option>
      <Map
        list={countries}
        render={({ code, label }) => <option value={code}>{label}</option>}
      />
    </RHFSelect>
  );
};
export default Countries;
