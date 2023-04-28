import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Panel from "./components/panel";
import TabPanel from "./components/tabPanel";
import useFund from "./hooks/useFund";

const Fund = ({ title, heading }) => {
  const { fund, getReport } = useFund({
    title,
    heading,
  });

  const [tab, setTab] = useState(0);
  const handleChange = async (_, newVal) => {
    setTab(newVal);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Fund Credit" />
        <Tab label="Fund Debit" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Panel data={fund.credit_report} getReport={getReport} />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Panel data={fund.debit_report} getReport={getReport} />
      </TabPanel>
    </>
  );
};

export default Fund;
