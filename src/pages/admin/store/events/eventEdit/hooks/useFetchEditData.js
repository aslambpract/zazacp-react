import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "src/utils/axios";
import * as Yup from "yup";

const NewProductSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  image: Yup.array().min(1, "Image is required"),
  price: Yup.number().moreThan(0, "Price should not be $0.00"),
});

const useFetchEventData = () => {
  const { eid } = useParams();
  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues: {
      image: [],
      event_type: "",
      zoom_password: "",
      location_zoom_url: "",
      timezone: "",
      topic: "",
      host: "",
      hr: "",
      min: "",
      access_scope: "",
    },
  });

  const fetchData = async (id) => {
    try {
      const { status, data } = await axiosInstance.get(
        `api/admin/events/${id}`
      );
      const {
        date_time,
        duration,
        image,
        event_type,
        zoom_password,
        location_zoom_url,
        timezone,
        topic,
        host,
        access_scope,
        description,
        product_id,
      } = data.data;
      const [date, time] = date_time.split(" ");
      const [hr, min] = duration.split(":");
      const [timeHr, timeMin] = time.split(":");
      if (status === 200)
        methods.reset({
          product_id,
          access_scope,
          image: [image],
          event_type,
          zoom_password,
          description,
          location_zoom_url,
          timezone,
          topic,
          host,
          hr,
          min,
          time: `${timeHr}:${timeMin}`,
          date: new Date(date),
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (eid) fetchData(eid);
  }, [eid]);

  return { methods, fetchData };
};

export default useFetchEventData;
