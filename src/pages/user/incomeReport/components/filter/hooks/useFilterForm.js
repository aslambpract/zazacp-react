import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { date, object, ref } from "yup";

export const incomeReportDefaultValues = {
  start_date: null,
  end_date: null,
  payment_type: "all",
};

const getTomorrow = () => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
};

const schema = object().shape({
  start_date: date()
    .max(getTomorrow(), "Future start date not allowed")
    .nullable(),
  end_date: date()
    .min(ref("start_date"), "end date can't be before start date")
    .nullable(),
});

const useFilterForm = () => {
  const methods = useForm({
    defaultValues: incomeReportDefaultValues,
    resolver: yupResolver(schema),
  });

  return methods;
};

export default useFilterForm;
