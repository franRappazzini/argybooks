import { CompleteUser, ICreateUser, ILogInUser } from "./../../utils/interfaces";

import { Dispatch } from "redux";
import axios from "axios";
import { userActions } from "../../utils/enums";

const URL = "http://localhost:3001/user";

export const createUser = async (user: ICreateUser) => {
  try {
    const { data } = await axios.post(URL, user);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const setLoggedUser = (user: object) => {
//   return (dispatch: Dispatch) => dispatch({ type: userActions.SET_LOGGED_USER, payload: user });
// };

export const setUser = (user: CompleteUser) => {
  return (dispatch: Dispatch) => dispatch({ type: userActions.SET_USER, payload: user });
};

export const findUser = async (user: ILogInUser) => {
  const { email, password } = user;

  try {
    const { data } = await axios.get(URL + `/logged?email=${email}&password=${password}`);
    return data;
  } catch (err) {
    throw err;
  }
};
