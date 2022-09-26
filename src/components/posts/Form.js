import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "antd";
import Autocomplete from "@mui/material/Autocomplete";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { sections } from "../../common/sections";

import { createPost, editPost } from "../../services/postService";
import { notification } from "../../function/notification";
import {
  closeFormPost,
  handleChangePost,
} from "../../stores/slices/formPostSlice";
import { useDispatch } from "react-redux";

export default function Form(props) {
  const { datas } = props;
  const [loading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState(datas?.tags || "");
  const [title, setTitle] = React.useState(datas?.title || "");
  const [url, setUrl] = React.useState(datas?.url || "");
  const [des, setDes] = React.useState(
    datas?.des || "<p>Nội dung bài viết</p> </br></br></br></br></br></br></br>"
  );

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    window.scrollTo(0, 600);
    const dateCreate = datas?.dateCreate || new Date().getDate();
    const monthCreate = datas?.monthCreate || new Date().getMonth() + 1;
    const yearCreate = datas?.yearCreate || new Date().getFullYear();
    const views = datas?.views || 0;
    const name =
      datas?.name ||
      localStorage.getItem("name") ||
      sessionStorage.getItem("name");
    const idUser =
      datas?.idUser ||
      localStorage.getItem("idUser") ||
      sessionStorage.getItem("idUser");
    const stt = datas?.stt || Number(sessionStorage.getItem("total")) + 1;

    const data = JSON.stringify({
      title,
      url,
      tags,
      des,
      dateCreate,
      monthCreate,
      yearCreate,
      name,
      idUser,
      stt,
      views,
    });
    if (datas) {
      try {
        const isSuccess = await editPost(datas.idPost, data);
        if (isSuccess) {
          setLoading(false);
          dispatch(handleChangePost());
          dispatch(closeFormPost());
          notification(
            "Thông báo",
            "Bạn đã chỉnh sửa bài viết thành công",
            "success",
            3000
          );
        } else {
          setLoading(false);
          notification(
            "Thông báo",
            "Đã xảy ra lỗi, thử lại sau",
            "error",
            3000
          );
        }
      } catch (e) {
        console.log(e.errorMessage);
      }
    } else {
      try {
        const isSuccess = await createPost(data);
        if (isSuccess) {
          setLoading(false);
          dispatch(handleChangePost());
          dispatch(closeFormPost());
          notification(
            "Thông báo",
            "Bạn đã thêm bài viết thành công",
            "success",
            3000
          );
        } else {
          setLoading(false);
          notification(
            "Thông báo",
            "Đã xảy ra lỗi, thử lại sau",
            "error",
            3000
          );
        }
      } catch (e) {
        console.log(e.errorMessage);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Tiêu đề bài viết"
          defaultValue={title}
          name="title"
          autoComplete="title"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          defaultValue={url}
          id="urlImg"
          label="Thêm ảnh chính bài viết (URL)"
          name="urlImg"
          autoComplete="urlImg"
          sx={{ marginTop: "0" }}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Autocomplete
          // multiple
          id="tags-outlined"
          options={sections}
          getOptionLabel={(option) => option.value}
          sx={{ mb: 1 }}
          filterSelectedOptions
          fullWidth
          onChange={(e) => {
            setTags(e.target.innerText);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn chủ đề bài viết"
              placeholder="Không có hãy chọn khác"
            />
          )}
        />
        <CKEditor
          editor={ClassicEditor}
          data={des}
          // onFocus={() => {
          //   if (!datas) {
          //     setDes("");
          //   }
          // }}
          onChange={(e, editor) => {
            setDes(editor.getData());
          }}
        />

        <Button
          block
          type="primary"
          loading={loading}
          onClick={(e) => handleSubmit(e)}
          style={{ margin: "10px 0 10px" }}
        >
          Đăng bài
        </Button>
      </Box>
    </Box>
  );
}
