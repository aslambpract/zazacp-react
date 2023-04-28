import { useEffect, useRef, useState } from "react";
import useAuth from "src/hooks/useAuth";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useGetTree = (url) => {
  const [username, setUsername] = useState("");
  const rootId = useRef("");
  const [treeData, setTreeData] = useState({});
  const handleErrors = useErrors();
  const { user } = useAuth();
  const { id: uid } = user;
  const handleSuccess = (data) => {
    const [_, userTree] = Object.entries(data)[0];

    setUsername(userTree.name);
    if (Object.keys(treeData).length === 0) rootId.current = userTree.id;
    setTreeData(userTree);
    return userTree.placement_id;
  };

  const getRoot = async (url) => {
    try {
      const { status, data } = await axiosInstance(url);
      if (status === 200) return handleSuccess(data);
    } catch (err) {
      handleErrors(err);
    }
  };

  const getChildren = async (url, id) => {
    const reqData = new FormData();
    reqData.append("user_id", id);
    let URI = `${url}-children`;
    try {
      const { status, data } = await axiosInstance.post(URI, reqData);
      if (status === 200) return handleSuccess(data);
    } catch (err) {
      handleErrors(err);
    }
  };

  const fetchData = async (id) => {
    return await (id ? getChildren(url, id) : getRoot(url));
  };

  useEffect(() => {
    if (uid) fetchData();
  }, [uid]);

  return { treeData, fetchTreeData: fetchData, username };
};

export default useGetTree;
