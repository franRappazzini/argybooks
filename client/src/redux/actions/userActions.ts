import { CompleteUser, ICreateUser, ILogInUser } from "./../../utils/interfaces";

import { Dispatch } from "redux";
import axios from "axios";
import { userActions } from "../../utils/enums";

const URL = "/user";

export const createUser = async (user: ICreateUser) => {
  try {
    const { data } = await axios.post(URL, user);
    return data;
  } catch (err) {
    throw err;
  }
};

export const setUser = (user: CompleteUser) => {
  return (dispatch: Dispatch) => dispatch({ type: userActions.SET_USER, payload: user });
};

export const findUser = async ({ email, password }: ILogInUser) => {
  try {
    const { data } = await axios.get(URL + `/logged?email=${email}&password=${password}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await axios.delete(URL + `/${id}`);
  } catch (err) {
    throw err;
  }
};

export const changePassword = async (id: string, password: string) => {
  try {
    await axios.put(URL + `/${id}?password=${password}`);
  } catch (err) {
    throw err;
  }
};
