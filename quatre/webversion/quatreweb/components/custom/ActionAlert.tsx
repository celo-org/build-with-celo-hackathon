import * as React from "react";
import Alert from "@mui/material/Alert";

type AlertColor = "success" | "info" | "warning" | "error";

type ActionAlertProps = {
  severty: AlertColor,
  col: AlertColor,
  msg: string
}

export default function ActionAlerts(props: ActionAlertProps):JSX.Element {
  const { severty, col, msg } = props;
  return (
    <Alert severity={severty} color={col}>
      {msg}
    </Alert>
  );
}
