import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  active: Yup.string().required("Active is required"),
  meta_description: Yup.string().required("Description is required"),
  product_category_id: Yup.string().required(
    "Choose Product Category is required"
  ),
  title: Yup.string().required("Title is required"),
  meta_keywords: Yup.string().required("Meta Keywords is required"),
  product_url: Yup.string().required("Product URL is required"),
  available_from: Yup.string().required("Available From is required"),
  available_to: Yup.string().required("Available To is required"),
  subscription_type: Yup.string().required("Subscription Type is required"),
});

export default ProductSchema;
