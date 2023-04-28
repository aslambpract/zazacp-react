import React from "react";
import EmptyContent from "src/components/EmptyContent";
import useLocales from "src/hooks/useLocales";
import emptyMail from "./asset/empty_mail.svg";

const EmptyMail = () => {
  const { translate } = useLocales();
  return (
    <EmptyContent
      title={translate("userHelpCenter.knowledgeBase.thereConversation")}
      img={emptyMail}
      sx={{ flexGrow: 1, height: "auto" }}
    />
  );
};

export default EmptyMail;
