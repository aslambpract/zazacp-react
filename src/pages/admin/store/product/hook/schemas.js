import { mixed, number, object, string } from "yup";

export const baseSchema = object().shape({
  name: string().required("Name is required"),
  active: string().required("Active is required"),
  meta_description: string().required("Description is required"),
  product_category_id: string().required("Choose Product Category is required"),
  title: string().required("Title is required"),
  meta_keywords: string().required("Meta Keywords is required"),
  payment_types: string().transform((v) => JSON.stringify(v)),

  product_url: string()
    .url("Please enter a valid url")
    .required("Product URL is required"),

  price: object().shape({
    "1 month": number()
      .typeError("Only number is allowed")
      .required("Add at least one price"),
  }),

  available_from: string()
    .transform((v) => new Date(v).toLocaleDateString("en-GB"))
    .required("Available From is required"),
  available_to: string()
    .transform((v) => new Date(v).toLocaleDateString("en-GB"))
    .required("Available To is required"),
  video: string().url(),
  image: mixed().test("isFile", "Select an image", (value) =>
    Boolean(value.length)
  ),
});

export const AddProductSchema = baseSchema.shape({
  doc: mixed().test("isFile", "Select a doc", (value) =>
    Boolean(value?.length)
  ),
  sample_doc: mixed().test("isFile", "Select a sample document", (value) =>
    Boolean(value?.length)
  ),
});

export { baseSchema as EditProductSchema };
