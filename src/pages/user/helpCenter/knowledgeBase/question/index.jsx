import { Box, Card, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import { useParams } from "react-router";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import Related from "./related";
import useLocales from "src/hooks/useLocales";


const getRandomDate = () => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

const Questions = () => {
  const { translate } = useLocales();
  const { slug } = useParams();
  return (
    <Page title={translate("userHelpCenter.knowledgeBase.faqTitle")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("userHelpCenter.knowledgeBase.faqs")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.root },
            {
              name: translate("userHelpCenter.knowledgeBase.knowledgeBase"),
              href: PATH_USER.helpCenter.knowledgeBase.root,
            },
            { name: translate("userHelpCenter.knowledgeBase.question") },
          ]}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "20% 80%" },
            columnGap: 3,
            rowGap: 3,
          }}
        >
          <Related />
          <Card
            sx={{
              padding: "1rem",
            }}
          >
            <Typography variant="h4">{capitalCase(slug)}?</Typography>
            <Typography variant="caption">
            {translate("userHelpCenter.knowledgeBase.lastUpdated")} {getRandomDate()}
            </Typography>

            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Card>
        </Box>
      </Box>
    </Page>
  );
};

export default Questions;
