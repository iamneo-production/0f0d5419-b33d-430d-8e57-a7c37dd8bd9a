import React from "react";
import Navbar from "../components/Navbar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AllDocumentList from "../components/AllDocumentList";

const ViewAllDocuments = () => {
  const isNonMobile = useMediaQuery("(min-width:480px)");
  const { palette } = useTheme();
  const backgroundDefault = palette.background.default;

  const handleOpenDocument = () => {};

  return (
    <Box height="100%" bgcolor={backgroundDefault}>
      <Navbar />
      <Box padding={isNonMobile ? "2rem 3rem" : "1rem 1rem"}>
        <AllDocumentList handleOpenDocument={handleOpenDocument} />
      </Box>
    </Box>
  );
};

export default ViewAllDocuments;
