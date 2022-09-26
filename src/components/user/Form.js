import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Form() {
  const [form, setForm] = React.useState(true);
  const signIn = (bool) => {
    setForm(bool);
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        boxShadow: "0 0 30px rgba(0,0,0, 0.3)",
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {form ? <SignIn signIn={signIn} /> : <SignUp signIn={signIn} />}
      </Grid>
    </Grid>
  );
}
export default Form;
//  <SignIn signIn={signIn} />
