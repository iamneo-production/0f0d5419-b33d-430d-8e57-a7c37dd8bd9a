import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";

const PostWidget = ({
  duration,
  postId,
  postUserId,
  name,
  picturePath,
  videoUrl,
  author
}) => {

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper m="2rem 0">
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem" }}
          src={picturePath}
        />
      )}

      <FlexBetween mt="0.5rem">
        <Typography color={main}>{name}</Typography>
        <Typography color={medium}>{duration}</Typography>
      </FlexBetween>
      <Typography color={medium}>{videoUrl}</Typography>
      <FlexBetween>
        <Typography color={medium}>{author}</Typography>
        <Chip label="Blender" size="small" />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
