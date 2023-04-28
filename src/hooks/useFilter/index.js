import useFilterForm from "./useFilterForm";

const useFilter = (fetchData) => {
  const methods = useFilterForm();
  const { handleSubmit } = methods;
  const onSubmit = async (inputData) => {
    const query = Object.entries(inputData)
      .map(([key, value]) => {
        if (value) return `${key}=${value}`;
      })
      .filter((v) => v !== null)
      .join("&")
      .trim();
    fetchData(query);
  };

  return { methods, onSubmit: handleSubmit(onSubmit) };
};

export default useFilter;
