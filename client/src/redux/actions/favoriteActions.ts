import { CompleteBook } from "./../../utils/interfaces";
import { Dispatch } from "redux";
import { favoriteActions } from "./../../utils/enums";

// import axios from "axios";

// const URL = "http://localhost:3001/favorite";

// export const addToFavorite = async (bookId: number, userId: number) => {
//   try {
//     await axios.post(URL, { bookId, userId });
//   } catch (err) {
//     throw err;
//   }
// };

export const addToFavorite = (book: CompleteBook) => {
  return (dispatch: Dispatch) => dispatch({ type: favoriteActions.ADD_FAVORITE, payload: book });
};

export const removeToFavorite = (id: number) => {
  return (dispatch: Dispatch) => dispatch({ type: favoriteActions.REMOVE_FAVORITE, payload: id });
};
