import { Store } from "react-notifications-component";

const toastMsg = (message, type, duration=3000) => {
  Store.addNotification({
    title: type,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true,
    },
  });
};

export default toastMsg;
