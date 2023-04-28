import { isBinary } from "src/utils/isBinary";

const createReqData = (data) => {
  const {
    bv,
    price,
    sample_doc,
    doc,
    image,
    active,
    subscription_type,
    life_time_access,
    filteredImageIds,
    ...newData
  } = data;

  const formData = new FormData();
  Object.entries(newData).forEach(([key, value]) =>
    formData.append(key, value)
  );

  image.forEach((v) => formData.append("image[]", v));
  filteredImageIds.forEach((v) => formData.append("deleted_images_id[]", v));
  formData.set("active", active ? 1 : 0);
  formData.set("sample_doc", sample_doc ? sample_doc[0] : null);
  formData.set("doc", doc ? doc[0] : null);
  formData.set(
    "subscription_type",
    subscription_type.toLowerCase() === "subscription" ? 1 : 0
  );
  formData.set("life_time_access", life_time_access ? 1 : 0);
  if (isBinary()) {
    Object.entries(bv).forEach(([key, value]) => {
      if (value) formData.append(`business_volume[${key}]`, value);
    });
  } else {
    formData.append("business_volume[1 month]", 0);
  }

  Object.entries(price).forEach(([key, value]) => {
    if (value) formData.append(`price[${key}]`, value);
  });

  return formData;
};

export default createReqData;
