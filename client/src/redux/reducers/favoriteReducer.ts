import { AnyAction } from "redux";
import { CompleteBook } from "./../../utils/interfaces";
import { favoriteActions } from "../../utils/enums";

interface Favorites {
  favorites: CompleteBook[];
}

const initialState: Favorites = {
  favorites: [],
};

const favoriteReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case favoriteActions.ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case favoriteActions.REMOVE_FAVORITE:
      const filter = state.favorites.filter((fav) => fav.id !== action.payload);
      return { ...state, favorites: filter };
    default:
      return state;
  }
};

export default favoriteReducer;
