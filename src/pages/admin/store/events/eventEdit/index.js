import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import Form from "../Form";
import useFetchEventData from "./hooks/useFetchEditData";
import useLocales from "src/hooks/useLocales";


const genReqData = (data) => {
  const { hr, min, image, time, date, ...rest } = data;
  const reqData = new FormData();
  reqData.append("duration", `${hr}:${min}`);
  reqData.append("img", image[0]);
  reqData.append(
    "date_time",
    `${new Date(date).toLocaleDateString("en-GB")} ${time}`
  );
  [...Object.entries(rest)].forEach(([key, value]) =>
    reqData.append(key, value)
  );

  return reqData;
};

const EventEdit = () => {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { eid } = useParams();
  const { fetchData, methods } = useFetchEventData();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    delete data.end_date;
    delete data.duration;
    delete data.date_time;
    const reqData = genReqData(data);
    reqData.append("_method", "PUT");
    try {
      const { status, data: resData } = await axiosInstance.post(
        `api/admin/events/${eid}`,
        reqData
      );

      if (status === 200) {
        methods.reset();
        fetchData();
        enqueueSnackbar(resData.message);
      }
      navigate(PATH_DASHBOARD.store.events);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(methods.getValues());
  return (
    <div>
      <Page title={translate("adminStore.events.eventEditTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.events.eventEdit")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name:translate("adminStore.events.event")  },
            ]}
          />

          <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} />
        </Box>
      </Page>
    </div>
  );
};

export default EventEdit;
