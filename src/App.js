import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BackTop } from "antd";
import React, { lazy, Suspense } from "react";
import { useEffect } from "react";
import ReactNotification from "react-notifications-component";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { sections } from "./common/sections";
import Page404 from "./components/differents/Page404";
import Spring from "./components/differents/Spring";

const Header = lazy(() => import("./components/primary/Header"));
const MainSection = lazy(() => import("./components/primary/MainSection"));
const ManagerPost = lazy(() => import("./components/posts/ManagerPost"));
const ViewPost = lazy(() => import("./components/posts/ViewPost"));
const Footer = lazy(() => import("./components/primary/Footer"));
const theme = createTheme();

function App() {
  var login = useSelector((state) => state.formLogin.login);
  useEffect(() => {
    localStorage.setItem("name", "Admin");
    localStorage.setItem("username", "admin");
    localStorage.setItem("password", "123456");
    localStorage.setItem("idUser", 0);
  }, []);

  const isLogin = () => {
    var isLogin = false;
    if (localStorage.getItem("username") || sessionStorage.getItem("username") || login) {
      isLogin = true;
    }
    return isLogin;
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense
        fallback={
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Spring />
          </div>
        }
      >
        <ReactNotification />

        <Container maxWidth="lg">
          <Header isLogin={isLogin()} sections={sections} title="Blog" />
          <Navigate to="/blog" />
          <Routes>
            <Route path="/blog" element={<MainSection />} />
            <Route path="/quan-li-bai-viet" element={<ManagerPost />} />
            <Route path="/xem-bai-viet" element={<ViewPost />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <BackTop>
            <Fab color="secondary" size="small">
              <KeyboardArrowUpIcon />
            </Fab>
          </BackTop>
        </Container>
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
