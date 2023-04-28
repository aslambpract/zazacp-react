import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Vimeo from "@u-wave/react-vimeo";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Iconify from "src/components/Iconify";
import SvgIconStyle from "src/components/SvgIconStyle";
import TextMaxLine from "src/components/TextMaxLine";
import DeleteDialog from "./deleteDialog";
import VideoEditDialog from "./editDialog";
import useLocales from "src/hooks/useLocales";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  video_tool_url: yup.string().required("Video URL is required"),
});

const defaultValues = {
  video_tool_url: "",
  title: "",
};

const VideoCard = ({ video, fetchVideos }) => {
  const { translate } = useLocales();
  const { title, created_at, video_url, id } = video;
  const [deleteId, setDeleteId] = useState(null);
  const onClose = () => setDeleteId(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const openEdit = () => {
    setIsEditOpen(true);
    methods.reset({
      title: title,
      video_tool_url: video_url,
      id: id,
    });
  };

  const closeVideo = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <Box mt={3}>
        <Card>
          <Box sx={{ position: "relative" }}>
            <SvgIconStyle
              src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: "absolute",
                color: "background.paper",
              }}
            />
            <Avatar
              alt="logo"
              src="https://freeiconshop.com/wp-content/uploads/edd/vimeo-flat.png"
              sx={{
                left: 24,
                zIndex: 9,
                width: 32,
                height: 32,
                bottom: -16,
                position: "absolute",
              }}
            />
            <Vimeo video={video_url} controls responsive />
          </Box>

          <CardContent
            sx={{
              width: 1,
              p: "24px 0 10px 24px",
            }}
          >
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              sx={{
                color: "text.disabled",
              }}
            >
              {new Date(created_at).toLocaleDateString("en-GB")}
            </Typography>
            <TextMaxLine variant="subtitle2" line={2} persistent>
              {title}
            </TextMaxLine>
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button
              onClick={openEdit}
              size="small"
              startIcon={<Iconify icon={"akar-icons:edit"} />}
            >
              {translate("adminTools.videos.edit")}
            </Button>
            <Button
              color="error"
              onClick={() => setDeleteId(id)}
              size="small"
              startIcon={<Iconify icon={"eva:trash-2-outline"} />}
            >
             {translate("adminTools.videos.delete")} 
            </Button>
          </CardActions>
        </Card>
      </Box>
      <DeleteDialog
        fetchVideos={fetchVideos}
        deleteId={deleteId}
        onClose={onClose}
      />
      <VideoEditDialog
        fetchVideos={fetchVideos}
        open={isEditOpen}
        onClose={closeVideo}
        methods={methods}
        title="Edit Video"
      />
    </>
  );
};

VideoCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default VideoCard;
