import { Dispatch } from "redux";
import axios from "axios";
import { favoriteActions } from "./../../utils/enums";

const URL = "/favorite";

export const toFavorite = async (userId: number, bookId: number) => {
  try {
    await axios.post(URL, { userId, bookId });
  } catch (err) {
    throw err;
  }
};

export const getFavorites = (userId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(URL + `/${userId}`);
      dispatch({ type: favoriteActions.GET_FAVORITES, payload: data.favorites });
    } catch (err) {
      throw err;
    }
  };
};

// export const removeToFavorite = async (bookId: number, userId: number) => {
//   try {
//     await axios.delete(URL + `/${userId}/${bookId}`);
//   } catch (err) {
//     throw err;
//   }
// };
