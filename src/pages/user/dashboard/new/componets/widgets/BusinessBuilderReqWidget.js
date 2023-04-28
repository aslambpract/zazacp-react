import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { capitalCase } from "change-case";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useErrors from "src/hooks/useErrors";
import { PATH_USER } from "src/routes/paths";
import fetchUser from "src/utils/fetchUser";
import useLocales from "src/hooks/useLocales";

const useBusinessBuilderReq = () => {
 
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await fetchUser("rank-requirements");
        if (status === 200) {
          setData(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };
    fetchData();
  }, []);

  return data;
};

const BusinessBuilderReqWidget = () => {
  const { translate } = useLocales();
  const data = useBusinessBuilderReq();
  return (
    <>
      <Card sx={{ p: 1 }}>
        <CardHeader title="Business Builder : Requirements" gutterBottom />
        <FormControl sx={{ p: 2 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="pay"
            name="radio-buttons-group"
            sx={{ p: 1 }}
          >
            {data?.map(({ message, count, id }) => {
              return (
                <FormControlLabel
                  key={id}
                  value="active"
                  control={<Checkbox size="small" />}
                  label={`${count} ${capitalCase(message)}`}
                  sx={{
                    border: "solid 1px #f0f0f0",
                    borderRadius: 1,
                    padding: 1,
                    marginTop: 1,
                  }}
                />
              );
            })}
          </RadioGroup>
          <Button
            variant="contained"
            sx={{ p: 1 }}
            LinkComponent={Link}
            to={PATH_USER.genealogy.affiliate}
          >
           {translate("userDashboard.viewAffiliateDashboard")} 
          </Button>
        </FormControl>
      </Card>
    </>
  );
};

export default BusinessBuilderReqWidget;
