import { useState } from "react";
import NoData from "src/components/noData";
import useDeleteVideo from "../hook/useDelete";
import AddDialog from "./AddDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import useEditVideo from "./hooks/useEditVideo";
import useGetVideo from "./hooks/useGetVideo";
import VideoCard from "./VideoCard";
import Wrapper from "./Wrapper";

const Video = () => {
  const { closeEdit, openEdit, videoData } = useEditVideo();
  const { closeDelete, openDelete, itemId } = useDeleteVideo();
  const { fetchVideos, videoList } = useGetVideo();
  const [openAdd, setOpenAdd] = useState(false);

  const isEmpty = !videoList?.length;
  return (
    <Wrapper openAdd={() => setOpenAdd(true)}>
      {isEmpty ? (
        <NoData />
      ) : (
        videoList?.map((item) => (
          <VideoCard
            key={item.id}
            item={item}
            openEdit={openEdit(item)}
            openDelete={openDelete(item.id)}
          />
        ))
      )}
      <AddDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fetchData={fetchVideos}
      />
      <EditDialog
        fetchData={fetchVideos}
        data={videoData}
        onClose={closeEdit}
      />
      <DeleteDialog
        fetchData={fetchVideos}
        videoId={itemId}
        onClose={closeDelete}
      />
    </Wrapper>
  );
};

export default Video;
