import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddUser from "../addUser";
import useAddUser from "../addUser/hooks/useAddUser";
import Node from "../node";
import Wrapper from "./wrapper";

const View = ({ treeData, fetchTreeData }) => {
  const { handleCloseAdd, handleOpenAdd, openAdd } = useAddUser();
  const [placeMentId, setPlacementId] = useState("");

  const onNodeClick = async (node) => {
    const placement_id = await fetchTreeData(node.id);
    setPlacementId(placement_id);
  };

  const goBack = async () => {
    const placement_id = await fetchTreeData(placeMentId);
    setPlacementId(placement_id);
  };

  const loaded = Boolean(Object.keys(treeData).length);
  return (
    <>
      <Wrapper>
        {placeMentId && <Button onClick={goBack}>back</Button>}
        {loaded ? (
          <Tree
            treeData={treeData}
            onNodeClick={onNodeClick}
            handleOpenAdd={handleOpenAdd}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <AddUser addUser={openAdd} onClose={handleCloseAdd} />
      </Wrapper>
    </>
  );
};

const Tree = ({ treeData, onNodeClick, handleOpenAdd }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Node openAdd={handleOpenAdd} node={treeData} onClick={onNodeClick} />
    </DndProvider>
  );
};

export default View;
