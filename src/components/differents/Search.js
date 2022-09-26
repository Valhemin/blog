import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search(props) {
  const { handleSearch } = props;
  const [key, setKey] = useState("");

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          marginBottom: "10px",
          width: "12vw",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(key);
      }}
    >
      <TextField
        id="standard-basic"
        size="small"
        label="Tìm bài viết"
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(key)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setKey(e.target.value);
          if (e.target.value.length === 0) {
            handleSearch(key);
          }
        }}
      />
    </Box>
  );
}
