import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
function MainFeaturedPost(props) {
  const { post, openPost } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post?.url})`,
      }}
    >
      {<img style={{ display: "none" }} src={post?.image} alt={post?.url} />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              style={{
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": "2",
                overflow: "hidden",
              }}
            >
              {post?.title}
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              paragraph
              style={{
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": "4",
                overflow: "hidden",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: post?.des }}></div>
            </Typography>
            <Link variant="subtitle1" onClick={() => openPost(post)}>
              Xem tiếp...
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MainFeaturedPost;
