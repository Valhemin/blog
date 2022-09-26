import { store } from "react-notifications-component";

export const notification = (title, message, type, time) => {
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__backInRight"],
    animationOut: ["animate__animated", "animate__backOutLeft"],
    dismiss: {
      duration: time,
      onScreen: true,
      pauseOnHover: true,
    },
  });
};

// import { notification } from "antd";

// export const Noti = (title, message = null, type) => {
//   notification[type]({
//     message: title,
//     description: message,
//   });
// };
