import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import getThreeYearsFromNow from "src/utils/getThreeYearsFromNow";
import { isBinary } from "src/utils/isBinary";
import { number, object } from "yup";
import { AddProductSchema, EditProductSchema } from "./schemas";

const defaultValues = {
  name: "",
  meta_keywords: "",
  product_category_id: "",
  meta_description: "",
  short_description: "",
  title: "",
  product_url: "",
  life_time_access: false,
  image: [],
  doc: [],
  sample_doc: [],
  video: "",
  active: false,
  subscription_type: "",
  available_from: new Date(),
  available_to: getThreeYearsFromNow(),
  payment_types: [],
  life_time_business_volume: "",
  life_time_price: "",
  no_of_days: "",
  productImages: [],
  filteredImageIds: [],
};

const addSchema = AddProductSchema;
const editSchema = EditProductSchema;
if (isBinary()) {
  addSchema.shape({
    bv: object().shape({
      "1 month": number()
        .typeError("Only number is allowed")
        .required("Add at least one bv"),
    }),
  });

  editSchema.shape({
    bv: object().shape({
      "1 month": number()
        .typeError("Only number is allowed")
        .required("Add at least one bv"),
    }),
  });
}

const useProductForm = (isEdit) => {
  return useForm({
    resolver: yupResolver(isEdit ? editSchema : addSchema),
    defaultValues,
  });
};

export default useProductForm;
