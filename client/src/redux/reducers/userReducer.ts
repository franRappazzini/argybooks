import { AnyAction } from "redux";
import { userActions } from "./../../utils/enums";

const initialState = {
  users: [],
  loggedUser: {},
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case userActions.GET_ALL_USERS:
      return { ...state, loggedUser: action.payload };
    case userActions.SET_USER:
      return { ...state, loggedUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
