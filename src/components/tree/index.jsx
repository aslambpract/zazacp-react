import { Box, Grid } from "@mui/material";
import useGetTree from "src/hooks/useGetTree";
import Legend from "./components/legend";
import TreeWrapper from "./components/treeWrapper";
import View from "./components/view";
import Styles from "./style.module.css";

const Tree = ({ legends = [], url }) => {
  const { treeData, fetchTreeData, username } = useGetTree(url);
  return (
    <>
      <View treeData={treeData} fetchTreeData={fetchTreeData} />
      <Legend username={username} legends={legends} />
    </>
  );
};

export const TreeWithoutLegend = ({ links, title, ...props }) => {
  return (
    <TreeWrapper title={title} links={links}>
      <Tree {...props} />
    </TreeWrapper>
  );
};

export const TreeWithLegend = ({ links, title, ...props }) => {
  return (
    <TreeWrapper title={title} links={links}>
      <Box
        className={Styles.binary_tree}
        sx={{
          backgroundColor: "background.paper",
        }}
      >
        <Grid container spacing={2}>
          <Tree {...props} />
        </Grid>
      </Box>
    </TreeWrapper>
  );
};

export default Tree;
