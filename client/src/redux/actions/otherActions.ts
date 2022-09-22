import { Dispatch } from "redux";
import axios from "axios";
import { otherActions } from "../../utils/enums";

const URL = "";

export const getCategories = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(URL + "/category");
      dispatch({ type: otherActions.GET_CATEGORIES, payload: data });
    } catch (err) {
      throw err;
    }
  };
};

export const getAuthors = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(URL + "/author");
      dispatch({ type: otherActions.GET_AUTHORS, payload: data });
    } catch (err) {
      throw err;
    }
  };
};
