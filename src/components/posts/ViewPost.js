import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { editPost, showPost } from "../../services/postService";
import Tags from "../differents/Tags";
import Post from "./Post";
import SimilarPosts from "./SimilarPosts";

export default function ViewPost() {
  const [datas, setDatas] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(
    "🚀 ~ file: ViewPost.js ~ line 16 ~ ViewPost ~ location",
    location
  );
  const urlParams = decodeURI(location.search);

  const openPost = (datas) => {
    window.scrollTo(0, 0);
    datas.views = datas.views + 1;
    editPost(datas?.idPost, datas);
    navigate(
      `/xem-bai-viet?idPost=${datas.idPost}&title=${datas.title}&tags=${datas.tags}`
    );
  };

  React.useEffect(() => {
    const getData = async () => {
      const data = await showPost(null, urlParams);
      setDatas(...data);
    };
    getData();
  }, [urlParams]);

  return (
    <Container maxWidth="lg" sx={"margin: 120px  0 4vh"}>
      <Tags tags={datas.tags}>
        <Button>
          <ShareIcon />
        </Button>
      </Tags>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Post datas={datas} view={true} />
        </Grid>
        <Grid item xs={4}>
          <SimilarPosts tags={datas.tags} openPost={openPost} />
        </Grid>
      </Grid>
    </Container>
  );
}
