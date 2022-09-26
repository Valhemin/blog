import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./Footer.scss";
const blog = [
  {
    value: " Trang chủ",
    path: "/",
  },
  {
    value: "Tài khoản",
    path: "#",
  },
  {
    value: "Viết bài",
    path: "#",
  },
  {
    value: "Liên hệ",
    path: "#",
  },
];

const iconCopyright = [
  {
    icon: "fab fa-facebook",
    href: "#section",
  },
  {
    icon: "fab fa-twitter",
    href: "#section",
  },
  {
    icon: "fab fa-google-plus-g",
    href: "#section",
  },
  {
    icon: "fab fa-instagram",
    href: "#section",
  },
  {
    icon: "fab fa-pinterest",
    href: "#section",
  },
];

function Footer() {
  return (
    <footer>
      <Container maxWidth="lg">
        <div className="footer-top">
          <Grid container spacing={2}>
            <Grid item xs={4} className="footer-contact">
              <h3>
                <strong>Contact</strong>
              </h3>
              <p>
                <i className="fas fa-map-marker-alt"></i> 132 Lê Đình Lý, Vĩnh
                Trung, Thanh Khê, Đà Nẵng
              </p>
              <p>
                <i className="fas fa-phone"></i> Liên hệ: 0246 123 1234
              </p>
              <p>
                <i className="fas fa-envelope"></i> Email:
                <a href="m#sectionailto:hello@domain.com">hello@unitech.com</a>
              </p>
              <p>
                <i className="fab fa-skype"></i> Skype: hell_you
              </p>
            </Grid>
            <Grid item xs={4} className="footer-about">
              <img className="logo-footer" src={logo} alt="logo-footer" />
              <p>
                Chúng tôi là một công ty trẻ luôn tìm kiếm những ý tưởng mới và
                sáng tạo để giúp bạn có những sản phẩm của chúng tôi trong công
                việc hàng ngày.
              </p>
              <p>
                <a href="##sectionsection">Đội của chúng tôi</a>
              </p>
            </Grid>
            <Grid item xs={4} className="footer-links">
              <h3>
                <strong>Blog</strong>
              </h3>
              {blog.map((item, i) => {
                return (
                  <p key={i}>
                    <Link to={item.path} className="scroll-link">
                      {item.value}
                    </Link>
                  </p>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className="footer-bottom">
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={6}>
              <div className="footer-copyright">
                &copy; Unitech {new Date().getFullYear()}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="footer-social">
                {iconCopyright.map((icon, i) => {
                  return (
                    <a href={icon.href} key={i}>
                      <i className={icon.icon}></i>
                    </a>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
}
export default React.memo(Footer);
