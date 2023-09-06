import React from "react";
import CardWrapper from "./CardWrapper";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";

const DocumentList = ({ data, handleDoc }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;

  const navigate = useNavigate();

  return (
    // Chathulka
    <CardWrapper gap="0.5rem">
      <FlexBetween>
        <Typography
          fontSize="14px"
          fontWeight="600"
          color="#5a5a5a"
          textTransform="uppercase"
        >
          Recent Documents
        </Typography>
        <PrimaryButton
          variant="outlined"
          size="small"
          onClick={() => {
            navigate("/view-all-documents");
          }}
        >
          View all
        </PrimaryButton>
      </FlexBetween>

      <Divider />

      {data
        .slice(-5)
        .reverse()
        .map((d) => {
          if (d !== null) {
            return (
              <Box
                key={d.id}
                mt="0.5rem"
                display="flex"
                flexDirection="column"
                gap="0.75rem"
              >
                <FlexBetween
                  padding="1rem"
                  bgcolor={primaryLight}
                  border="1px solid #b5b5b5"
                  borderRadius="0.5rem"
                >
                  <Typography
                    // mb="0.5rem"
                    fontSize="14px"
                    fontWeight="600"
                  >
                    {d.name}
                  </Typography>

                  {/* Milshan */}
                  <PrimaryButton
                    variant="outlined"
                    size="small"
                    onClick={() => handleDoc(d.note, d.id)}
                  >
                    Edit
                  </PrimaryButton>
                </FlexBetween>
              </Box>
            );
          }
        })}
    </CardWrapper>
  );
};

export default DocumentList;
