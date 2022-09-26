import React from "react";
import { Button } from "antd";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Copyright from "../differents/Copyright";
import { handleLogin } from "../../services/userService";
import { notification } from "../../function/notification";

import { useDispatch } from "react-redux";
import { closeFormLogin, login } from "../../stores/slices/formLoginSlice";

function SignIn(props) {
  const { signIn } = props;
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: "",
    save: false,
    loading: false,
  });
  const [valids, setValids] = React.useState({
    username: false,
    password: false,
  });

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleSave = (e) => {
    setValues({ ...values, save: e.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    var sign = {};
    if (values.username.length === 0) {
      setValids({ ...valids, username: true });
    } else if (values.password.length === 0) {
      setValids({ ...valids, password: true });
    } else if (values.username.length !== 0 && values.password.length !== 0) {
      setValids({ ...valids, username: false, password: false });
      setValues({ ...values, loading: true });
      sign = await handleLogin(values.username, values.password);
      setValues({ ...values, loading: false });
    }

    if (sign.errCode === 1) {
      setValues({ ...values, loading: false });

      notification(
        "Tài khoản không tồn tại!",
        "Không tồn tại tài khoản này, thử lại.",
        "danger",
        2000
      );
    }
    if (sign.errCode === 3) {
      setValues({ ...values, loading: false });

      notification(
        "Đăng nhập không thành công !",
        "Mật khẩu không đúng, thử lại.",
        "warning",
        2000
      );
    } else if (sign.errCode === 0) {
      setValues({ ...values, loading: false });

      if (values.save) {
        localStorage.setItem("username", values.username);
        localStorage.setItem("name", sign.user.name);
        localStorage.setItem("idUser", sign.user.id);
      } else {
        sessionStorage.setItem("username", values.username);
        sessionStorage.setItem("name", sign.user.name);
        sessionStorage.setItem("idUser", sign.user.id);
      }
      dispatch(login());
      dispatch(closeFormLogin());

      notification(
        "Thông báo",
        `Xin chào bạn ${sign.user.name} !`,
        "success",
        3000
      );
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          error={valids.username}
          helperText={valids.username && "Nhập tài khoản"}
          onChange={(e) => {
            setValues({ ...values, username: e.target.value });
          }}
          required
          fullWidth
          id="username"
          label="Tài khoản"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          error={valids.password}
          helperText={valids.password && "Nhập mật khẩu"}
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
          name="password"
          label="Mật khẩu"
          id="password"
          autoComplete="current-password"
          type={values.showPassword ? "text" : "password"}
          values={values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox value="remember" color="primary" onChange={handleSave} />
          }
          label="Remember me"
        />
        <Button
          type="primary"
          block
          loading={values.loading}
          style={{ marginBottom: "4px" }}
          onClick={(e) => handleSubmit(e)}
        >
          Đăng nhập
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              onClick={() => {
                signIn(false);
              }}
            >
              Chưa có tài khoản? Đăng kí!
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}

export default SignIn;
