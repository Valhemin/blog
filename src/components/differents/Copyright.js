import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © Me <Link color="inherit" href="http://vi.unitech.vn/"></Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
