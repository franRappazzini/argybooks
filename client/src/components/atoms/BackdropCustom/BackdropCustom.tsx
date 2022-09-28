import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";

import { SweetAlertResult } from "sweetalert2";

interface Props {
  btnText: string;
  onClick: (e: React.SyntheticEvent) => Promise<void | SweetAlertResult<any>>;
  open: boolean;
}

function BackdropCustom({ btnText, onClick, open }: Props) {
  const handleToggle = (e: React.SyntheticEvent) => onClick(e);

  return (
    <>
      <Button type="submit" onClick={handleToggle} variant="contained">
        {btnText}
      </Button>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
        <Typography mt={2}>Puede demorar varios segundos...</Typography>
      </Backdrop>
    </>
  );
}

export default BackdropCustom;
