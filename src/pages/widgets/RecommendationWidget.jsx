import React from "react";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { Box, Chip, Divider, Typography, useTheme } from "@mui/material";
import FlexStart from "components/FlexStart";

const RecommendationWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Typography color={dark} variant="h5" fontWeight="500">
        Recommendations
      </Typography>
      <FlexBetween flexDirection="column" gap="0.25rem">
        <Box>
          <img
            width="100%"
            height="auto"
            alt="advert"
            // src="http://localhost:3001/assets/info4.jpeg"
            src="../../assets/info4.jpeg"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
          />
          <FlexBetween>
            <Typography color={main}>Big Buck Bunny</Typography>
            <Typography color={medium}>8:18</Typography>
          </FlexBetween>
          <Typography color={medium}>www.videolink.com</Typography>
          <FlexBetween>
            <Typography color={medium}>Blender Inc.</Typography>
            <Chip label="Blender" size="small" />
          </FlexBetween>
        </Box>
        <Box>
          <img
            width="100%"
            height="auto"
            alt="advert"
            // src="http://localhost:3001/assets/info4.jpeg"
            src="../../assets/info4.jpeg"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
          />
          <FlexBetween>
            <Typography color={main}>Big Buck Bunny</Typography>
            <Typography color={medium}>8:18</Typography>
          </FlexBetween>
          <Typography color={medium}>www.videolink.com</Typography>
          <FlexBetween>
            <Typography color={medium}>Blender Inc.</Typography>
            <Chip label="Blender" size="small" />
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default RecommendationWidget;
