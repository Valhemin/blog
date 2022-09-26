import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { closeFormLogin } from "../../stores/slices/formLoginSlice";
import Form from "./Form";

const theme = createTheme();

export default function Login(props) {
  const open = useSelector((state) => state.formLogin.open);
  const dispatch = useDispatch();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="lg"
        onClose={() => dispatch(closeFormLogin())}
      >
        <Form />
      </Dialog>
    </ThemeProvider>
  );
}
