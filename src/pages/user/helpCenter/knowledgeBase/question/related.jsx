import { Card, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { capitalCase, headerCase } from "change-case";
import { NavLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_USER } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

import i18n from "src/locales/i18n"
  

const Related = () => {

const questions = [
  i18n.t("userHelpCenter.knowledgeBase.question1"),
  i18n.t("userHelpCenter.knowledgeBase.question2"),
  i18n.t("userHelpCenter.knowledgeBase.question3"),
  i18n.t("userHelpCenter.knowledgeBase.question4"),
  i18n.t("userHelpCenter.knowledgeBase.question5"),
];

  const { translate } = useLocales();
  const linkTo = (path) =>
    PATH_USER.helpCenter.knowledgeBase.question(headerCase(path).toLowerCase());
  const { palette } = useTheme();
  return (
    <Card
      sx={{
        padding: "1rem",
        height: "fit-content",
        gridRow: { md: "initial", sm: "2 / 3", xs: "2 / 3" },
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Iconify icon="charm:info" />
          <Typography fontWeight="bold">{translate("userHelpCenter.knowledgeBase.relatedQuestions")} </Typography>
        </Stack>
        <Stack spacing={2}>
          {questions?.map((question) => (
            <Typography
              component={NavLink}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: palette.primary.main,
                    }
                  : null
              }
              to={linkTo(question)}
              color="white"
              sx={{
                color: palette.primary.main,
                textDecoration: "none",
                "&:hover": {
                  color: "primary.light",
                },
              }}
            >
              {capitalCase(question)}?
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default Related;
