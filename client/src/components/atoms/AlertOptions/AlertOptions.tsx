import Swal, { SweetAlertIcon } from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Props {
  title: string;
  text: string;
  icon: SweetAlertIcon;
  onConfirm: () => void;
}

async function AlertOptions({ title, text, icon, onConfirm }: Props) {
  const result = await MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ver libro creado",
    cancelButtonText: "Seguir creando",
  });

  if (result.isConfirmed) {
    onConfirm();
  }
}

export default AlertOptions;
