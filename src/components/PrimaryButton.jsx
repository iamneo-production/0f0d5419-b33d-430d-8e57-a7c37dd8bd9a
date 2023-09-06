import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ onClick, children, ...other }) => {
  return (
    <Button {...other} onClick={onClick} sx={{ fontSize: "12px" }}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
