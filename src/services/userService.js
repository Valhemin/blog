import axios from "../axios";

const handleLogin = (user, password) => {
   return axios.post("/api/login", { userName: user, passWord: password });
};
const handleCreate = (data) => {
   return axios.post("/api/create-new-user", data);
};
// const getAllUsers = (inputId) => {
//   return axios.get(`/api/get-all-users?id=${inputId}`);
// };
// const deleteUserService = (userId) => {
//   return axios.delete("/api/delete-user", {
//     data: {
//       id: userId,
//     },
//   });
// };

// const editUserService = (inputData) => {
//   return axios.put("/api/edit-user", inputData);
// };
export {
   handleLogin,
   handleCreate,
   // getAllUsers,
   // deleteUserService,
   // editUserService,
};
