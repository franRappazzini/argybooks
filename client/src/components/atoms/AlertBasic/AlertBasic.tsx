import Swal, { SweetAlertIcon } from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function AlertBasic(alert: string, message: string | undefined, icon: SweetAlertIcon) {
  return MySwal.fire(alert, message, icon);
}

export default AlertBasic;
