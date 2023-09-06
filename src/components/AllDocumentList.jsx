import React, { useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import FlexEnd from "./FlexEnd";
import FlexBetween from "./FlexBetween";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import Axios  from "axios";

const AllDocumentList = ({ data, handleDoc }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem("email");
     Axios.get(`http://localhost:8080/documents?userId=${email}`).then((res) => {
     setNotes(res.data);
     })
  },[])

  return (
    <>
     
      <CardWrapper  minHeight="100%">
        <Typography
          fontSize="14px"
          fontWeight="600"
          color="#5a5a5a"
          textTransform="uppercase"
        >
          All Documents
        </Typography>

        <Divider sx={{mb: "1rem", mt:"0.5rem"}} />
        {notes.slice(0).reverse().map((d) => {
          if (d !== null) {
            return (
        <Box key={d.id} display="flex" flexDirection="column">
          <FlexBetween
            padding="1rem"
            bgcolor={primaryLight}
            borderBottom="1px solid #5a5a5a"
          >
            <Typography
              // mb="0.5rem"
              fontSize="14px"
              fontWeight="600"
            >
             
            {d.name}
            </Typography>
        
            <FlexEnd>
              <PrimaryButton
                variant="outlined"
                size="small"
                // onClick={() => handleDoc(d.note)}
              >
                View
              </PrimaryButton>
            </FlexEnd>
          </FlexBetween>
        </Box>
       );
          }
        })} 
      </CardWrapper>
    </>
  );
};

export default AllDocumentList;
