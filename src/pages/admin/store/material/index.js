import { Box, Card, CircularProgress } from "@mui/material";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import HeaderBar from "./HeaderBar";
import useMaterials from "./hooks/useMaterials";
import MaterialTable from "./MaterialTable";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const { translate } = useLocales();
  const { materials, rowStart, ...rest } = useMaterials();

  return (
    <div>
      <Page title={translate("adminStore.products.materialTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBar />
          <Card sx={{ p: 3 }}>
            {materials.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <MaterialTable materials={materials} rowStart={rowStart} />
            )}
          </Card>
          <PaginationButtons {...rest} />
        </Box>
      </Page>
    </div>
  );
};

export default Index;
