import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { PATH_DASHBOARD } from "src/routes/paths";

import axiosInstance from "src/utils/axios";
import genReqData from "../../utils/genReqData";

const NewProductSchema = Yup.object().shape({
  product_id: Yup.string().required("Product name is required"),
  event_type: Yup.string().required("Event type is required"),
  location_zoom_url: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  time: Yup.string().required("Time is required"),
  hr: Yup.string().required("Hour is required"),
  min: Yup.string().required("Minute is required"),
  timezone: Yup.string().required("Timezone is required"),
  image: Yup.array().min(1, "Image is required"),
  host: Yup.string().required("Host name is required"),
  topic: Yup.string().required("Topic is required"),
});

const useAddEvent = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues: {
      image: [],
      access_scope: "Private",
      date: new Date(),
      time: "00:00",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const { status, data } = await axiosInstance.post(
        "/api/admin/events",
        genReqData(formData)
      );
      if (status === 200) {
        methods.reset();
        enqueueSnackbar(data.message);
        navigate(PATH_DASHBOARD.store.events);
      }
      enqueueSnackbar(data.message, { variant: "error" });
    } catch (error) {
      enqueueSnackbar("Failed to add event", { variant: "error" });
      console.error(error);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useAddEvent;
