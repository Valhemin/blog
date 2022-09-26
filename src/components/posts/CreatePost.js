import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Form from "./Form";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { closeFormPost } from "../../stores/slices/formPostSlice";
import { openFormEdit } from "../../stores/slices/formPostSlice";

function CreatePost() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.formPost.open);
  const name = useSelector((state) => state.formPost.name);
  const datas = useSelector((state) => state.formPost.datas);

  if (name === "Viết bài") {
    dispatch(openFormEdit(""));
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="md"
      onClose={() => dispatch(closeFormPost())}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{ marginTop: "30px", textAlign: "center" }}
      >
        {name}
      </Typography>
      {datas ? <Form datas={datas} /> : <Form />}
    </Dialog>
  );
}
export default React.memo(CreatePost);
