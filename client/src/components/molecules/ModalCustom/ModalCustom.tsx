import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface Props {
  title: string;
  text: string;
  text2?: string;
  children: React.ReactNode;
  btnName: string;
  btnColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  btnSuccessColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  btnSuccessDisabled: boolean;
  onClick: () => Promise<void>;
}

function ModalCustom({
  title,
  text,
  text2,
  children,
  btnName,
  btnColor,
  btnSuccessColor,
  btnSuccessDisabled,
  onClick,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = async () => {
    setLoading(true);

    await onClick();

    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen} color={btnColor} size="small">
        {btnName}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" mb={2}>
            {text}
          </DialogContentText>
          <DialogContentText variant="body2" mb={1}>
            {text2}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <LoadingButton
            loading={loading}
            onClick={handleConfirm}
            color={btnSuccessColor}
            disabled={btnSuccessDisabled}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalCustom;
