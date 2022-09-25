import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Toast(icon: "error" | "info" | "question" | "success" | "warning", title: string) {
  const MyToast = MySwal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", MySwal.stopTimer);
      toast.addEventListener("mouseleave", MySwal.resumeTimer);
    },
  });

  return MyToast.fire({
    icon,
    title,
  });
}

export default Toast;
