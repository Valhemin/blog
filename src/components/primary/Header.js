import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Login from "../user/Login";
import { useSelector, useDispatch } from "react-redux";
import { openFormLogin, logout } from "../../stores/slices/formLoginSlice";
import {
  openFormPost,
  handleChangeTag,
} from "../../stores/slices/formPostSlice";
import { useNavigate } from "react-router-dom";
import CreatePost from "../posts/CreatePost";

function Header(props) {
  const { isLogin, sections, title } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showFormLogin = useSelector((state) => state.formLogin.open);
  const showCreatePost = useSelector((state) => state.formPost.open);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/quan-li-bai-viet");
        }}
      >
        Quản lí bài viết
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(openFormPost())}>Viết bài</Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("username");
          localStorage.removeItem("name");
          localStorage.removeItem("idUser");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("idUser");
          dispatch(logout());
          window.location.reload();
        }}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  var name = localStorage.getItem("name") || sessionStorage.getItem("name");

  return (
    <Container
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f2f2f2",
        zIndex: 99,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {isLogin ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => dispatch(openFormPost("Viết bài"))}
          >
            Viết bài
          </Button>
        ) : (
          <div></div>
        )}

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ cursor: "pointer" }}
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/");
          }}
        >
          {title}
        </Typography>

        {isLogin ? (
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <a
              href
              className="ant-dropdown-link"
              style={{ cursor: "default" }}
              onClick={(e) => e.preventDefault()}
            >
              {name} <DownOutlined />
            </a>
          </Dropdown>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(openFormLogin());
            }}
          >
            Tài khoản
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.value}
            variant="body2"
            sx={{ p: 1, flexShrink: 0 }}
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(handleChangeTag(section.value));
            }}
          >
            {section.value}
          </Link>
        ))}
      </Toolbar>
      {showFormLogin ? <Login /> : <></>}
      {showCreatePost ? <CreatePost /> : <></>}
    </Container>
  );
}

export default React.memo(Header);
