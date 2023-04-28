import { useEffect } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import useTicketForm from "./useTicketForm";

const useGetTicketById = (id) => {
  const methods = useTicketForm();
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await axiosInstance(
          `api/admin/support-tickets/${id}`
        );
        if (status === 200) {
          const {
            user_id,
            subject,
            description,
            priority_id,
            department_id,
            category_id,
            status,
            attachments_url,
            content,
            active,
          } = data.data;
          methods.reset({
            user_id,
            subject,
            description,
            priority_id,
            department_id,
            category_id,
            status,
            attachments_url,
            content,
            active,
          });
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    if (id) fetchData();
  }, [id]);

  return methods;
};
export default useGetTicketById;
