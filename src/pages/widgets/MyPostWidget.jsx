import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import PrimaryButton from "components/PrimaryButton";
import { click } from "@testing-library/user-event/dist/click";

const MyPostWidget = ({ picturePath, videos, handleSearch }) => {
  // const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const [showRes, setShowRes] = useState(true);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsPanel, setSearchResultsPanel] = useState([]);
  const handleSearch2 = (event) => {
    console.log(event);
    setPost(event);
  };

  const handleSrchPanel = (value)=>{
      setPost(value);
      setSearchResultsPanel([]);
  }

  useEffect(() => {
    if(post !== ''){
      const filter = videos.filter((item) =>
      item.title.toLowerCase().includes(post.toLowerCase())
    );
    setSearchResults(filter);
    setSearchResultsPanel(filter);
    handleSearch(filter);
    }
  }, [post]);

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem">
        <InputBase
          placeholder="Search desired content..."
          onChange={(event) => handleSearch2(event.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.25rem 2rem",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          // onClick={handlePost}
          sx={{
            padding: "0.45rem 1.5rem",
            borderRadius: "3rem",
          }}
        >
          Search
        </Button>
      </FlexBetween>
      {searchResultsPanel.length !== 0 && <Box
      sx={{
        width: "100%",
        marginTop: '5px'
      }}>
        {searchResultsPanel.map(item => <p onClick={() => handleSrchPanel(item.title)} className="srchP">{item.title}</p>)}
      </Box>}

    </WidgetWrapper>
  );
};

export default MyPostWidget;
