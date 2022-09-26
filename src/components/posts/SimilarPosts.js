import React from "react";
import Post from "./Post";
import Grid from "@mui/material/Grid";
import { showPost } from "../../services/postService";
export default function SimilarPosts(props) {
  const { tags, openPost = false } = props;
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    const getData = async () => {
      const post = [];
      const params = { tags, sortBy: "stt", order: "desc" };
      const data = await showPost(params);
      post.push(data[0], data[1], data[2]);
      setDatas(post);
    };
    getData();
  }, [tags]);
  return (
    <Grid container spacing={2}>
      {datas.map((data) => (
        <Grid item xs={12}>
          <Post datas={data} openPost={() => openPost(data)} />
        </Grid>
      ))}
    </Grid>
  );
}
