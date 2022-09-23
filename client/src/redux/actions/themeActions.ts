import { Dispatch } from "redux";
import { PaletteMode } from "@mui/material";
import { themeActions } from "../../utils/enums";

export const changeTheme = (theme: PaletteMode) => {
  return (dispatch: Dispatch) => dispatch({ type: themeActions.CHANGE_THEME, payload: theme });
};
