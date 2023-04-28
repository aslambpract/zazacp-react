import { capitalCase } from "change-case";
import { RHFSelect } from "src/components/hook-form";
import Map from "src/components/map";
import Ternary from "src/components/ternary";
import { isNotBinary } from "src/utils/isBinary";

const paymentTypes = [
  "all",
  "referral_bonus",
  "binary_bonus",
  "first_order_bonus",
  "achievement_bonus",
  "credited_by_admin ",
];

const binaryMode = (type) => !(isNotBinary() && type === "binary_bonus");

const Option = ({ type }) => <option value={type}>{capitalCase(type)}</option>;

const PaymentTypes = () => {
  return (
    <RHFSelect name="payment_type" size="small">
      <Map
        list={paymentTypes}
        render={(type) => (
          <Ternary when={binaryMode(type)} then={<Option type={type} />} />
        )}
      />
    </RHFSelect>
  );
};

export default PaymentTypes;
