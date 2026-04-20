import { Slide } from "react-toastify";

export const toastOptions = ({
  position = "top-center",
  autoClose = 3000,
  hideProgressBar = true,
  closeOnClick = true,
  pauseOnHover = false,
  draggable = false,
  progress = undefined,
  theme = "light",
} = {}) => {
  return {
    position: position,
    autoClose: autoClose,
    hideProgressBar: hideProgressBar,
    closeOnClick: closeOnClick,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    style: {
      borderRadius: "3px",
      width: "400px",
      background: "white",
      color: "var(--color-last)",
    },
  };
};
