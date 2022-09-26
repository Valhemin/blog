import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Post from "../posts/Post";
import SiderBar from "../siderbar";
import Pagina from "../differents/Pagina";
import { siderbar } from "../../common/siderbar";

import { showPost } from "../../services/postService";

export default function ManagerPost() {
  const [datas, setDatas] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const tags = useSelector((state) => state.formPost.tags);
  const change = useSelector((state) => state.formPost.change);
  const login = useSelector((state) => state.formLogin.login);
  const isLogin =
    localStorage.getItem("idUser") || sessionStorage.getItem("idUser");

  var idUser =
    localStorage.getItem("idUser") || sessionStorage.getItem("idUser");
  if (
    localStorage.getItem("username") == "admin" ||
    sessionStorage.getItem("username") == "admin"
  )
    idUser = "";
  else idUser = 12312312312321;
  React.useEffect(() => {
    const getData = async () => {
      const params = {
        idUser,
        tags,
      };
      const get = await showPost(params);
      setTotal(get);
    };
    getData();
  }, [idUser, tags, change, login]);

  React.useEffect(() => {
    const getData = async () => {
      const params = {
        idUser,
        tags,
        page,
        limit: pageSize,
        sortBy: "stt",
        order: "desc",
      };
      const get = await showPost(params);
      setDatas(get);
    };
    getData();
  }, [idUser, tags, page, pageSize, change, login]);

  const changePage = (page, pageSize) => {
    window.scrollTo(0, 600);
    setPage(page);
    setPageSize(pageSize);
  };

  return (
    <Container maxWidth="lg" sx={"margin: 120px  0 4vh"}>
      {isLogin ? (
        <Grid container spacing={4}>
          <Grid item xs={10}>
            <div
              style={{
                marginBottom: "20px",
                textAlign: "center",
                fontSize: "22px",
              }}
            >
              Quản lí các bài đã viết
            </div>
            <Grid container spacing={3}>
              {datas.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    padding: "80px",
                    textAlign: "center",
                  }}
                >
                  Chưa có bài viết nào.{" "}
                  {datas.length === 0 ? <LoadingOutlined /> : <></>}
                </div>
              ) : (
                datas.map((data, i) => (
                  <Grid item xs={6} key={i}>
                    <Post datas={data} manager={true} />
                  </Grid>
                ))
              )}
            </Grid>
            <Pagina total={total.length} changePage={changePage} />
          </Grid>
          <Grid item xs={2}>
            <SiderBar archives={datas} social={siderbar.social} />
          </Grid>
        </Grid>
      ) : (
        <div style={{ marginTop: 140 }}>
          <div style={{ textAlign: "center", padding: 80 }}>
            Vui lòng đăng nhập.
          </div>
        </div>
      )}
    </Container>
  );
}
