import { RHFSelect } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const Status = () => {
  const { translate } = useLocales();
  return(
    <RHFSelect name="status" label={translate("adminCommunication.helpCenter.status")} >
      <option value="" />
      <option value="open"> {translate("adminCommunication.helpCenter.open")} </option>
      <option value="resolved"> {translate("adminCommunication.helpCenter.resolved")} </option>
      <option value="closed"> {translate("adminCommunication.helpCenter.closed")} </option>
      <option value="archived"> {translate("adminCommunication.helpCenter.archived")} </option>
      <option value="deleted"> {translate("adminCommunication.helpCenter.deleted")} </option>
      <option value="unverified"> {translate("adminCommunication.helpCenter.unverified")} </option>
      <option value="request_approval"> {translate("adminCommunication.helpCenter.requestApproval")} </option>
      <option value="in_progress"> {translate("adminCommunication.helpCenter.nProgress")} </option>
      <option value="responded"> {translate("adminCommunication.helpCenter.responded")} </option>
    </RHFSelect>
  );
}

export default Status;
