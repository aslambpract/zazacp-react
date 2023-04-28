import useFilterForm from "./useFilterForm";

const useFilter = (onFilter) => {
  const methods = useFilterForm();

  const onSubmit = (data) => {
    const { start_date, end_date, payment_type } = data;
    onFilter({
      start_date:
        start_date && new Date(start_date).toLocaleDateString("en-GB"),
      end_date: end_date && new Date(end_date).toLocaleDateString("en-GB"),
      payment_type: payment_type,
    });
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useFilter;
