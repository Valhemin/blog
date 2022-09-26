import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

function FeaturedPost(props) {
  const { post, openPost } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }} onClick={() => openPost(post)}>
          <CardContent sx={{ flex: 1 }}>
            <Typography
              component="h2"
              variant="h5"
              style={{
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": "2",
                overflow: "hidden",
              }}
            >
              {post?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {`${post?.dateCreate}-${post?.monthCreate}-${post?.yearCreate}`}
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              style={{
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": "3",
                overflow: "hidden",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: post?.des }}></div>
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              onClick={() => openPost(post)}
            >
              Xem tiếp...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: 260,
              display: { xs: "none", sm: "block" },
            }}
            image={post?.url}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
