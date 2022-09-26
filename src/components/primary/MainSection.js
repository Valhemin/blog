import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import MainFeaturedPost from "../posts/MainFeaturedPost";
import FeaturedPost from "../posts/FeaturedPost";
import Post from "../posts/Post";
import SiderBar from "../siderbar";
import Pagina from "../differents/Pagina";
import Search from "../differents/Search";
import { siderbar } from "../../common/siderbar";
import { useNavigate } from "react-router";

import { showPost, editPost } from "../../services/postService";
import { useSelector } from "react-redux";

function App() {
  const [datas, setDatas] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [key, setKey] = React.useState("");

  const [mainFeaturedPost, setMainFeaturedPost] = React.useState({});
  const [featuredPosts, setFeaturedPosts] = React.useState([]);
  const change = useSelector((state) => state.formPost.change);
  const tags = useSelector((state) => state.formPost.tags);
  const navigate = useNavigate();

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
      const params = {
        title: key,
        tags,
      };
      const get = await showPost(params);
      if (get) setTotal(get);
    };
    getData();
  }, [key, tags, change]);

  sessionStorage.setItem("total", total.length);
  React.useEffect(() => {
    const getData = async () => {
      const params = {
        title: key,
        tags,
        page,
        limit: pageSize,
        sortBy: "stt",
        order: "desc",
      };
      const get = await showPost(params);
      if (get) setDatas(get);
    };
    getData();
  }, [key, tags, page, pageSize, change]);

  const getMainFeaturePost = React.useCallback(async () => {
    const params = {
      tags,
      sortBy: "views",
      orderby: "desc",
    };
    const posts = await showPost(params);
    if (posts) setMainFeaturedPost(posts[0]);
  }, [tags]);

  const getFeaturePost = React.useCallback(async () => {
    const params = {
      tags,
      sortBy: "views",
      orderby: "desc",
    };
    const posts = await showPost(params);
    if (posts) {
      var featured = [];
      featured.push(posts[1], posts[2]);
      setFeaturedPosts(featured);
    }
  }, [tags]);

  React.useEffect(getMainFeaturePost, [tags, getMainFeaturePost]);
  React.useEffect(getFeaturePost, [tags, getFeaturePost]);

  const changePage = (page, pageSize) => {
    window.scrollTo(0, 600);
    setPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (keysearch) => {
    setKey(keysearch);
  };

  return (
    <Container maxWidth="lg" sx={"margin: 120px  0 4vh"}>
      <CssBaseline />
      <MainFeaturedPost post={mainFeaturedPost} openPost={openPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post?.id} post={post} openPost={openPost} />
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        <Grid item xs={10}>
          <Search handleSearch={handleSearch} />
          <Grid container spacing={2}>
            {datas &&
              datas.map((data, i) => {
                return (
                  <Grid item xs={6} key={i}>
                    <Post datas={data} manager={false} openPost={openPost} />
                  </Grid>
                );
              })}
          </Grid>
          <Pagina total={total.length} changePage={changePage} />
        </Grid>
        <Grid item xs={2}>
          <SiderBar archives={datas} social={siderbar.social} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
