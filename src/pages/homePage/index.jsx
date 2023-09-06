import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
// import { useSelector } from "react-redux";
import UserWidget from "pages/widgets/UserWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import AdvertWidget from "pages/widgets/RecommendationWidget";
import FriendListWidget from "pages/widgets/FriendListWidget";
import RecommendationWidget from "pages/widgets/RecommendationWidget";
import Axios from "axios";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [cat, setCat] = useState([]);
  const [videos, setVideos] = useState([]);
  const [srch, setSrch] = useState([]);
  // const { _id, picturePath } = useSelector((state) => state.user);
  const email = sessionStorage.getItem("email");
  const getinterestsTypes = async () => {
    const response = await Axios.get(
      `http://localhost:8080/interests?userId=${email}`
    );
    console.log(response.data,'responce eka2sss....');
    setCat(response.data);
    console.log(cat,'responce eka2....');
  };
  const getVideo = async () => {
    const response = await Axios.get(`http://localhost:8080/videos`);
    console.log(response.data,'responce eka2sss....');
    setVideos(response.data);
  };

  const handleSearch = (data)=>{
    console.log(data, 'data .........')
    setSrch(data);
  }

  useEffect(()=>{
    getVideo();
  }, []);

  useEffect(() => {
    getinterestsTypes();
    console.log(cat)
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget cats={cat} userId="01" picturePath="../../assets/p2.jpeg" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {videos.length !== 0 && <MyPostWidget handleSearch={handleSearch} videos={videos} picturePath="../../assets/p2.jpeg" />}
          {cat.length !== 0 && <PostsWidget srchs={srch} cats={cat} userId={cat.userId} />}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="25%">
            <RecommendationWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
