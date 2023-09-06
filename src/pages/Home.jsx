import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulletedRounded,
  FormatListNumbered,
  FormatUnderlined,
} from "@mui/icons-material";
import DocumentList from "../components/DocumentList";
import FlexEnd from "../components/FlexEnd";
import PrimaryButton from "../components/PrimaryButton";
import TextFormatButton from "../components/TextFormatButton";
import Navbar from "../components/Navbar";
import { useTheme } from "@emotion/react";
import Axios from "axios";

const Home = ({ data, handleDoc }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);

  const [size, setSize] = useState("4");
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const isNonMobile = useMediaQuery("(min-width:480px)");
  const { palette } = useTheme();
  const primaryMain = palette.primary.main;
  const backgroundDefault = palette.background.default;

  const [isExist, setIsExist] = useState(false);
  const [resMsg, setResMsg] = useState('');
  
  const [noteId, setNoteId] = useState(0);

  const formatNote = (cmd, value = null) => {
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand(cmd);
    }
  };

  // Milshan, Thisarani

  const handleUpdate = ()=>{
    const data = {note: content}
     Axios.patch(`http://localhost:8080/documents/${noteId}`, data).then((res)=>{
        
        setResMsg('Your note successfuly Updated.');
        setContent('');
        setIsExist(false);
        document.getElementById('editor').innerHTML = "";

     });

  }

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    Axios.get(`http://localhost:8080/documents?userId=${email}`).then((res) => {
      console.log(res.data, 'data....')
      setNotes(res.data);
    });
  }, [isExist, open]);

  const handleNote = () => {
    const doc = document.getElementById("editor")?.innerHTML + "";
    setContent(doc);
  };

  const handleSize = (event) => {
    setSize(event.target.value);
    formatNote("fontSize", event.target.value);
  };

  // Chathulka
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = (e) => {
    const email = sessionStorage.getItem("email");

    const data = { name: name, note: content, userId: email };
    Axios.post("http://localhost:8080/documents", data).then((res) => {
  
      setOpen(false);
      setIsExist(false);
    });
  };

  // Milshan
  const handleDocs = (n, id) => {
    setIsExist(true);
    setNoteId(id);
    document.getElementById('editor').innerHTML = n;
    setContent(n);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
    <Box height="100%" bgcolor={backgroundDefault}>
      <Navbar />
      {/* MODAL */}

      {/* Chathulka */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Note Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleName}
          />
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant="outlined" onClick={handleClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton variant="contained" onClick={handleSave}>
            Save
          </PrimaryButton>
        </DialogActions>
      </Dialog>

      <Box padding={isNonMobile ? "2rem 3rem" : "1rem 1rem"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <CardWrapper gap="1rem">
              <Box
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                gap="15px"
              >
                {/* TEXT FORMAT */}
                {/* milshan, thisarani */}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Size</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={size}
                    label="Age"
                    onChange={handleSize}
                  >
                    <MenuItem value="2">Extra small</MenuItem>
                    <MenuItem value="3">Small</MenuItem>
                    <MenuItem value="4">Regular</MenuItem>
                    <MenuItem value="5">Medium</MenuItem>
                    <MenuItem value="6">Large</MenuItem>
                    <MenuItem value="7">Extra Large</MenuItem>
                  </Select>
                </FormControl>
                <TextFormatButton onClick={() => formatNote("bold")}>
                  <FormatBold />
                </TextFormatButton>
                <TextFormatButton onClick={() => formatNote("italic")}>
                  <FormatItalic />
                </TextFormatButton>
                <TextFormatButton onClick={() => formatNote("underline")}>
                  <FormatUnderlined />
                </TextFormatButton>
                <TextFormatButton onClick={() => formatNote("justifyLeft")}>
                  <FormatAlignLeft />
                </TextFormatButton>
                <TextFormatButton onClick={() => formatNote("justifyCenter")}>
                  <FormatAlignCenter />
                </TextFormatButton>
                <TextFormatButton onClick={() => formatNote("justifyRight")}>
                  <FormatAlignRight />
                </TextFormatButton>
                <TextFormatButton
                  onClick={() => formatNote("insertOrderedList")}
                >
                  <FormatListNumbered />
                </TextFormatButton>
                <TextFormatButton
                  onClick={() => formatNote("insertUnorderedList")}
                >
                  <FormatListBulletedRounded />
                </TextFormatButton>
              </Box>

              <div
                variant="outlined"
                id="editor"
                contentEditable="true"
                spellCheck="false"
                style={{
                  border: "1px solid #b5b5b5",
                  borderRadius: "0.2rem",
                  minHeight: isNonMobile ? "312px" : "350px",
                  padding: "20px",
                  ":focus": {
                    borderColor: primaryMain,
                  },
                }}
                onInput={handleNote}
              />

              {/* dinethi */}
              <FlexEnd width="100%" gap="0.5rem">
              {!isExist && <PrimaryButton
                  variant="contained"
                  size="small"
                  onClick={handleClickOpen}
                >
                  Save Changes
                </PrimaryButton>}
                {isExist && <PrimaryButton
                  variant="contained"
                  size="small"
                  onClick={handleUpdate}
                >
                  Update Changes
                </PrimaryButton>}
              </FlexEnd>
            </CardWrapper>
          </Grid>

          {/* milshan */}
          {isNonMobile && (
            <Grid item xs={12} md={5}>
              
                <DocumentList data={notes} handleDoc={handleDocs} />
              
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
