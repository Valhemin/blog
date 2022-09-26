import { API_DOMAIN } from "../common/api";
import axios from "axios";

const showPost = async (params = null, urlParams = "") => {
  var data = null;
  var config = {
    method: "get",
    url: `${API_DOMAIN}/posts`,
  };

  if (params !== null) {
    config.params = params;
  }
  if (urlParams !== "") {
    config.url = `${API_DOMAIN}/posts${urlParams}`;
  }
  try {
    await axios(config)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch {
    alert("Net Work Error !");
  }

  return data;
};

const createPost = async (data) => {
  var isSuccess = false;

  const url = `${API_DOMAIN}/posts`;
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    method: "post",
    url,
    headers,
    data,
  };
  try {
    await axios(config)
      .then((res) => {
        if (res.data.length !== -1) isSuccess = true;
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch {
    alert("Network error !");
  }

  return isSuccess;
};

const editPost = async (id, data0) => {
  var isSuccess = false;

  const data = JSON.stringify(data0);

  const url = `${API_DOMAIN}/posts/${id}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    method: "put",
    url,
    headers,
    data,
  };
  try {
    await axios(config)
      .then((res) => {
        if (res.data.length !== -1) isSuccess = true;
      })
      .catch((err) => {
        isSuccess = false;
        console.log(err.message);
      });
  } catch {
    alert("Network error !");
  }

  return isSuccess;
};

const deletePost = async (id) => {
  var isSuccess = false;

  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method: "delete",
    url: `${API_DOMAIN}/posts/${id}`,
    headers,
  };
  try {
    await axios(config)
      .then((res) => {
        if (res.data.length !== -1) isSuccess = true;
      })
      .catch((err) => {
        isSuccess = false;
        console.log(err.message);
      });
  } catch {
    alert("Network error !");
  }

  return isSuccess;
};

export { showPost, createPost, editPost, deletePost };
