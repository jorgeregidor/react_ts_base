import { Bounce, toast } from "react-toastify";

const showSuccess = (text: string) => {
  toast.success(text, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export default showSuccess;
