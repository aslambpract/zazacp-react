import { Box, Button, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";
import usePriceAndBvs from "../../hook/usePriceAndBv";

const PriceAndBvs = () => {
  const { translate } = useLocales();
  const { months, remove, addMonth, clear } = usePriceAndBvs();
  const binaryMode = isBinary();
  return (
    <>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
          },
        }}
      >
        {months.map((month) => {
          return month ? (
            <>
              <RHFTextField
                InputLabelProps={{ shrink: true }}
                name={`price.[${month} month]`}
                label={`Price ${month} Month`}
                placeholder={`Price ${month} Month`}
              />
              {binaryMode ? (
                <RHFTextField
                  InputLabelProps={{ shrink: true }}
                  name={`bv.[${month} month]`}
                  label={`BV ${month} Month`}
                  placeholder={`BV ${month} Month`}
                />
              ) : (
                <span />
              )}

              <span style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={remove(month)}
                  color="error"
                  size="small"
                  startIcon={<Iconify icon={"gala:remove"} />}
                >
                  {translate("adminStore.products.remove")}
                </Button>
              </span>
            </>
          ) : null;
        })}
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mb: 5 }}
      >
        <Button
          onClick={() => {
            clear();
          }}
          color="info"
          size="small"
          startIcon={<Iconify icon={"carbon:reset"} />}
        >
          {translate("adminStore.products.reset")}
        </Button>
        <Button
          onClick={addMonth}
          size="small"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          sx={{ marginLeft: 3 }}
        >
          {translate("adminStore.products.addPrice")}
        </Button>
      </Grid>
    </>
  );
};

const Wrapper = () => {
  const { getValues } = useFormContext();
  const [bv, price] = getValues(["bv", "price"]);

  const { pid } = useParams();

  if (!pid) return <PriceAndBvs />;

  return bv && price ? <PriceAndBvs /> : null;
};

export default Wrapper;
