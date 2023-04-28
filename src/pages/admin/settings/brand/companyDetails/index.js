import { useSnackbar } from "notistack";
import { FormProvider } from "src/components/hook-form";
import axiosInstance from "src/utils/axios";
import ChangeLogo from "./ChangeLogo";
import DetailsForm from "./DetailsForm";
import useCompanyDetails from "./hooks/useCompanyDetails";

const CompanyDetails = () => {
  const { methods, detailId } = useCompanyDetails();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (inputData) => {
    const reqData = new FormData();

    const { logo, favicon, side_bar_logo, ...rest } = inputData;

    [...Object.entries(rest)].forEach(([key, value]) =>
      reqData.append(key, value)
    );
    reqData.append("favicon_img", favicon);
    reqData.append("logo_img", logo);
    reqData.append("side_bar_logo_img", side_bar_logo);
    reqData.append("active", 1);
    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/brand-company-details/${detailId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <ChangeLogo />
      <DetailsForm />
    </FormProvider>
  );
};

export default CompanyDetails;
