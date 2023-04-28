import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import Progress from "src/components/Progress";
import useGetTree from "src/hooks/useGetTree";

const renderTree = ({ id, name, children }) => {
  if (!id) return null;
  return (
    <TreeItem key={id} nodeId={id?.toString()} label={name}>
      {Array.isArray(children)
        ? children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
};

const Tree = () => {
  const { treeData: data } = useGetTree("api/admin/sponsortree");

  const isLoaded = Boolean(Object.keys(data).length);

  if (!isLoaded) return <Progress />;

  return (
    <>
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        sx={{ height: 216, flexGrow: 1, maxWidth: "auto", overflowY: "auto" }}
      >
        {Array.isArray(data)
          ? data.map((node) => renderTree(node))
          : renderTree(data)}
      </TreeView>
    </>
  );
};

export default Tree;
