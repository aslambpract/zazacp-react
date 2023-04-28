import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Divider, Stack, Tab, Typography } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";

import Map from "src/components/map";
import Ternary from "src/components/ternary";
import useLocales from "src/hooks/useLocales";
import { trim } from "src/pages/admin/store/productCategories/Components/ProductCategory";
import Review from "./review";

const MoreInfo = ({ product }) => {
  const { translate } = useLocales();
  const [value, setValue] = useState("1");
  const {
    user_reviews,
    product_questions: questions,
    product_description: description,
  } = product;
  const [review] = user_reviews || [];
  const modules = {
    toolbar: null,
  };
  return (
    <Card>
      <TabContext value={value}>
        <Box sx={{ px: 3, bgcolor: "background.neutral" }}>
          <TabList onChange={(_, value) => setValue(value)}>
            <Tab
              disableRipple
              value="1"
              label={translate("profuctDetails.description")}
            />
            <Tab
              disableRipple
              value="2"
              label={translate("profuctDetails.questions")}
            />
            <Tab
              disableRipple
              value="3"
              label={`Review (${review?.review_count || 0})`}
              sx={{ "& .MuiTab-wrapper": { whiteSpace: "nowrap" } }}
            />
          </TabList>
        </Box>

        <Divider />

        <TabPanel value="1">
          <Box sx={{ p: 3 }}>
            <Ternary
              when={description}
              then={
                <ReactQuill
                  value={description}
                  theme="bubble"
                  modules={modules}
                  readOnly
                />
              }
            />
          </Box>
        </TabPanel>

        <TabPanel value="2">
          <Stack spacing={3} sx={{ p: 3 }}>
            <Map
              list={questions}
              render={({ title, description, created_at, id }) => (
                <Stack key={id} spacing={1}>
                  <Typography variant="h6">{trim(title)}</Typography>
                  <Typography variant="caption" color="GrayText">
                    {new Date(created_at).toLocaleDateString("en-GB")}
                  </Typography>
                  <Typography paragraph>{trim(description)}</Typography>
                </Stack>
              )}
            />
          </Stack>
        </TabPanel>
        <TabPanel value="3">
          <Review product={product} />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default MoreInfo;
