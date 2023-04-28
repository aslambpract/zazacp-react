import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "src/utils/axios";

const defaultValues = {
  effective_until: "",
};

const useEditForm = (pid) => {
  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const { status, data } = await axiosInstance.get(
          `api/admin/business-builder-subscriptions/${id}`
        );
        if (status === 200) {
          methods.setValue("effective_until", data.data.effective_until);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (pid) fetchData(pid);
  }, [pid]);

  return methods;
};

export default useEditForm;
