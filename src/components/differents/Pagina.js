import React from "react";
import Box from "@mui/material/Box";

import { Pagination } from "antd";
export default function Pagina(props) {
  const { total, changePage } = props;
  return (
    <Box
      component="div"
      sx={{
        padding: "40px 0 20px",
        textAlign: "center",
        "& > ul> li> a": {
          textDecoration: "none",
        },
      }}
    >
      <Pagination
        total={total}
        showTotal={(total) => `Hiện có ${total} bài viết`}
        defaultCurrent={1}
        showSizeChanger={false}
        onChange={(page, PageSize) => {
          changePage(page, PageSize);
        }}
      />
    </Box>
  );
}
