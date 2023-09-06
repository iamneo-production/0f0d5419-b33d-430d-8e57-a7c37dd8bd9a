import { IconButton, useTheme } from "@mui/material";
import React from "react";

const TextFormatButton = ({ onClick, children }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  return (
    <>
      <IconButton
        // disableRipple
        // disableTouchRipple
        aria-label="bold"
        sx={{
          padding: "0.2rem",
          borderRadius: "0.2rem",
          ":hover": {
            backgroundColor: primaryLight,
          },
        }}
        onClick={onClick}
      >
        {children}
      </IconButton>
    </>
  );
};

export default TextFormatButton;
