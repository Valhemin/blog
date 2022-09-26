import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { Popconfirm, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { notification } from "../../function/notification";
import { deletePost } from "../../services/postService";
import {
  handleChangePost,
  openFormEdit,
  openFormPost,
} from "../../stores/slices/formPostSlice";
import CreateBy from "../differents/CreateBy";

function Post(props) {
  const { datas, manager = false, view = false, openPost } = props;
  var date = datas?.dateCreate;
  var month = datas?.monthCreate;
  var year = datas?.yearCreate;
  var des = datas?.des;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const copyLink = (datas) => {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `http://localhost:3000/xem-bai-viet?idPost=${datas.idPost}&title=${datas.title}&tags=${datas.tags}`;
    input.select();
    document.execCommand("copy");
    input.remove();
    message.success("Copy link bài viết thành công !");
  };

  const handleEdit = (datas) => {
    dispatch(openFormEdit(datas));
    dispatch(openFormPost("Chỉnh sửa"));
  };

  const handleDelete = async () => {
    try {
      const isSuccess = await deletePost(datas.idPost);
      if (isSuccess) {
        dispatch(handleChangePost());
        notification(
          "Thông báo !",
          "Đã xóa bài viết thành công.",
          "success",
          3000
        );
      } else
        notification(
          "Thông báo !",
          "Đã xảy ra lỗi, thử lại sau.",
          "error",
          3000
        );
    } catch (e) {
      console.log("Network error");
    }
  };
  return (
    <Card>
      <CardMedia component="img" height="200" src={datas?.url} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={
            view || {
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "2",
              overflow: "hidden",
            }
          }
        >
          {datas?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={
            view || {
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "3",
              overflow: "hidden",
            }
          }
        >
          <div dangerouslySetInnerHTML={{ __html: des }}></div>
        </Typography>
      </CardContent>
      <CardActions>
        {manager ? (
          <div style={{ marginLeft: "auto" }}>
            <Tooltip
              title="Chỉnh sửa bài viết"
              TransitionComponent={Zoom}
              arrow
            >
              <IconButton
                onClick={() => {
                  handleEdit(datas);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa bài viết" TransitionComponent={Zoom} arrow>
              <IconButton>
                <Popconfirm
                  title="Bạn muốn xóa bài viết này"
                  onConfirm={handleDelete}
                  onCancel={() => {}}
                  okText="OK"
                  cancelTextt="Cancel"
                >
                  <DeleteIcon />
                </Popconfirm>
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <>
            {view || (
              <>
                <Tooltip
                  title="Chia sẽ bài viết"
                  TransitionComponent={Zoom}
                  arrow
                >
                  <Button onClick={() => copyLink(datas)}>
                    <ShareIcon />
                  </Button>
                </Tooltip>
                <Button onClick={() => openPost(datas)}>Xem Tiếp</Button>{" "}
              </>
            )}

            <CreateBy
              name={datas?.name}
              date={date + "-" + month + "-" + year}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
}
export default React.memo(Post);
