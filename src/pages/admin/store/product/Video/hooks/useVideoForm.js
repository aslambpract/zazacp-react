import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useVideoForm = (data) => {
  const methods = useForm({ defaultValues: { video_url: "" } });

  useEffect(() => {
    if (data) {
      methods.reset({ video_url: data.video_url, id: data.id });
    }
  }, [data]);

  return methods;
};

export default useVideoForm;
