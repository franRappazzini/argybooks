import { AnyAction } from "redux";
import { themeActions } from "../../utils/enums";

const initialState = {
  theme: "light",
};

const themeReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case themeActions.CHANGE_THEME:
      return { theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
