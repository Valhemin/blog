import React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "antd";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copyright from "../differents/Copyright";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { handleCreate } from "../../services/userService";
import { handleLogin } from "../../services/userService";

import { notification } from "../../function/notification";

import { useDispatch } from "react-redux";
import { closeFormLogin, login } from "../../stores/slices/formLoginSlice";

const theme = createTheme();

function SignUp(props) {
  const { signIn } = props;
  const [values, setValues] = React.useState({
    name: "",
    username: "",
    password: "",
    showPassword: "",
    save: false,
    loading: false,
  });
  const [valids, setValids] = React.useState({
    name: false,
    username: false,
    password: false,
  });
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    let regist = {};
    let sign = {};
    if (values.name.length === 0) {
      setValids({ ...valids, name: true });
    } else if (values.username.length === 0) {
      setValids({ ...valids, username: true });
    } else if (values.password.length === 0) {
      setValids({ ...valids, password: true });
    } else if (values.username.length !== 0 && values.password.length !== 0) {
      setValids({ ...valids, username: false, password: false });
      setValues({ ...values, loading: true });
      let data = {
        name: values.name,
        userName: values.username,
        passWord: values.password,
      };
      regist = await handleCreate(data);
      setValues({ ...values, loading: false });
    }

    if (regist.errCode === 1) {
      setValues({ ...values, loading: false });

      notification(
        "Tài khoản đã tồn tại!",
        "Đã tồn tại tài khoản này, thử tên tài khoản khác.",
        "danger",
        2000
      );
    } else if (regist.errCode === 0) {
      setValues({ ...values, loading: false });

      sign = await handleLogin(values.username, values.password);
      sessionStorage.setItem("username", values.username);
      sessionStorage.setItem("name", values.name);
      sessionStorage.setItem("idUser", sign.user.id);

      dispatch(login());
      dispatch(closeFormLogin());
      window.location.reload();
      notification(
        "Thông báo",
        `Chào mừng bạn đến với trang Blog này !`,
        "success",
        3000
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng kí
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={valids.name}
                  helperText={valids.name && "Đặt biệt danh của bạn"}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                  id="name"
                  label="Biệt danh"
                  name="name"
                  autoComplete="family-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  error={valids.username}
                  helperText={valids.username && "Nhập tài khoản"}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      username: e.target.value,
                    });
                  }}
                  required
                  fullWidth
                  id="username"
                  label="Tài khoản"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={valids.password}
                  helperText={valids.password && "Nhập mật khẩu"}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      password: e.target.value,
                    });
                  }}
                  name="password"
                  label="Mật khẩu"
                  id="password"
                  autoComplete="current-password"
                  type={values.showPassword ? "text" : "password"}
                  values={values.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleShowPassword}>
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="primary"
              block
              loading={values.loading}
              style={{ marginBottom: "4px" }}
              onClick={(e) => handleSubmit(e)}
            >
              Đăng kí
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    signIn(true);
                  }}
                >
                  Đã có tài khoản? Đăng nhập!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUp;
