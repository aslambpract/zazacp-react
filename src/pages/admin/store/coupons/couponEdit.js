import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useErrors from "src/hooks/useErrors";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import EditForm from "./EditForm";
import useGetCouponById from "./hooks/useGetCouponById";
import { default as genReqData } from "./utils/genReqData";
import useLocales from "src/hooks/useLocales";


const CouponEdit = () => {
  const { translate } = useLocales();
  const methods = useGetCouponById();
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const onSubmit = async (inputData) => {
    const { end_date, start_date, id, ...editData } = inputData;
    const reqData = genReqData(editData);
    reqData.set("end_date", new Date(end_date).toLocaleDateString("en-GB"));

    reqData.set("start_date", new Date(start_date).toLocaleDateString("en-GB"));

    reqData.append("_method", "PUT");

    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/coupons/${id}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <>
      <Page title={translate("adminStore.coupons.editCouponTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.coupons.editCoupon")}
            links={[
              { name:translate("dashboard") , href: PATH_DASHBOARD.root },
              { name: translate("adminStore.coupons.coupon"), href: PATH_DASHBOARD.store.coupons },
              { name: translate("adminStore.coupons.editCoupon") },
            ]}
          />
          <EditForm
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          />
        </Box>
      </Page>
    </>
  );
};

export default CouponEdit;
