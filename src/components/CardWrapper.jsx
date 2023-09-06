const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const CardWrapper = styled(Box)({
  padding: " 1.5rem 1.5rem",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
});

export default CardWrapper;
