import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const ReviewAddSchema = Yup.object().shape({
  rating: Yup.mixed().required("Rating is required"),
  product_id: Yup.string().required("Select a product"),
  username: Yup.string().required("User name is required"),
  title: Yup.string().required("Title is required"),
  comment: Yup.string().required("Review is required"),
});

const defaultValues = {
  rating: null,
  product_id: "",
  username: "",
  title: "",
  comment: "",
};
const useReviewForm = () => {
  return useForm({
    resolver: yupResolver(ReviewAddSchema),
    defaultValues,
  });
};

export default useReviewForm;
