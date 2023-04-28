import { Box, Card, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { capitalCase } from "change-case";
import React from "react";
import { Link } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n";

const KnowledgeBase = () => {
  const _data = [
    {
      icon: "ci:settings",
      title: i18n.t("userHelpCenter.knowledgeBase.accountSettings"),
      questions: [
        i18n.t("userHelpCenter.knowledgeBase.accountQ1"),
        i18n.t("userHelpCenter.knowledgeBase.accountQ2"),
        i18n.t("userHelpCenter.knowledgeBase.accountQ3"),
        i18n.t("userHelpCenter.knowledgeBase.accountQ4"),
        i18n.t("userHelpCenter.knowledgeBase.accountQ5"),
      ],
    },
  
    {
      icon: "ci:settings",
      title: i18n.t("userHelpCenter.knowledgeBase.apiQuestions"),
      questions: [
        i18n.t("userHelpCenter.knowledgeBase.apiQuestions1"),
        i18n.t("userHelpCenter.knowledgeBase.apiQuestions2"),
        i18n.t("userHelpCenter.knowledgeBase.apiQuestions3"),
        i18n.t("userHelpCenter.knowledgeBase.apiQuestions4"),
        i18n.t("userHelpCenter.knowledgeBase.apiQuestions5"),
      ],
    },
    {
      icon: "ci:settings",
      title: i18n.t("userHelpCenter.knowledgeBase.billing"),
      questions: [
        i18n.t("userHelpCenter.knowledgeBase.billingQ1"),
        i18n.t("userHelpCenter.knowledgeBase.billingQ2"),
        i18n.t("userHelpCenter.knowledgeBase.billingQ3"),
        i18n.t("userHelpCenter.knowledgeBase.billingQ4"),
        i18n.t("userHelpCenter.knowledgeBase.billingQ5"),
      ],
    },
    {
      icon: "ci:settings",
      title: i18n.t("userHelpCenter.knowledgeBase.copyright"),
      questions: [
        i18n.t("userHelpCenter.knowledgeBase.copyrightQ1"),
        i18n.t("userHelpCenter.knowledgeBase.copyrightQ2"),
        i18n.t("userHelpCenter.knowledgeBase.copyrightQ3"),
        i18n.t("userHelpCenter.knowledgeBase.copyrightQ4"),
        i18n.t("userHelpCenter.knowledgeBase.copyrightQ5"),
      ],
    },
    {
      icon: "ci:settings",
      title: i18n.t("userHelpCenter.knowledgeBase.mobileApps"),
      questions: [
        i18n.t("userHelpCenter.knowledgeBase.mobileAppsQ1"),
        i18n.t("userHelpCenter.knowledgeBase.mobileAppsQ2"),
        i18n.t("userHelpCenter.knowledgeBase.mobileAppsQ3"),
        i18n.t("userHelpCenter.knowledgeBase.mobileAppsQ4"),
        i18n.t("userHelpCenter.knowledgeBase.mobileAppsQ5"),
      ],
    },
    {
      icon: "ci:settings",
      title: i18n.t("userHelpCenter.knowledgeBase.usingKnowHow"),
      questions: [
        i18n.t("userHelpCenter.knowledgeBase.usingKnowHowQ1"),
        i18n.t("userHelpCenter.knowledgeBase.usingKnowHowQ2"),
        i18n.t("userHelpCenter.knowledgeBase.usingKnowHowQ3"),
        i18n.t("userHelpCenter.knowledgeBase.usingKnowHowQ4"),
      ],
    },
  ];
  
  const { translate } = useLocales();
  const { palette } = useTheme();
  return (
    <Page title={translate("userHelpCenter.knowledgeBase.title")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("userHelpCenter.knowledgeBase.knowledgeBase")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.root },
            { name: translate("userHelpCenter.knowledgeBase.knowledgeBase") },
          ]}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(3, 1fr)", sm: "repeat(2, 1fr)" },
            columnGap: 3,
            rowGap: 3,
          }}
        >
          {_data.map(({ title, questions }) => (
            <Card
              sx={{
                padding: "1rem",
                height: "300px",
              }}
              component={Stack}
              spacing={3}
            >
              <Typography variant="h6">
                {title} ({questions.length})
              </Typography>
              <Stack spacing={2}>
                {questions.map((question) => {
                  return (
                    <Typography
                      component={Link}
                      to={question.toLowerCase().replaceAll(" ", "-")}
                      color="white"
                      sx={{
                        color: palette.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {capitalCase(question)}?
                    </Typography>
                  );
                })}
              </Stack>
            </Card>
          ))}
        </Box>
      </Box>
    </Page>
  );
};


export default KnowledgeBase;
