import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
import PostWidget from "./PostWidget";
import Axios from "axios";

const PostsWidget = ({ userId, isProfile = false, cats, srchs }) => {
  const [videos, setVideos] = useState([]);
  const getData = async () => {
    const response = await Axios.get(`http://localhost:8080/videos`);
    console.log(response, "responce eka....");
    console.log(cats, "responce eka cat....");

    const catArray = cats.map((item) => item.category);
    console.log(catArray);
    const filter = response.data.filter((item) =>
      catArray.includes(item.category)
    );
    console.log(filter);
    setVideos(filter);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setVideos(srchs)
  }, [srchs]);


  return (
    <>
      
      {videos.length !== 0 &&
        videos.map((item) => (
          <PostWidget
            key={item.id}
            postId={item.id}
            postUserId={item.userId}
            author={item.author}
            videoUrl={item.videoUrl}
            duration={item.duration}
            name={item.title}
            picturePath={item.thumbnailUrl}
          />
        ))}

      {/* )
      )} */}
    </>
  );
};

export default PostsWidget;
