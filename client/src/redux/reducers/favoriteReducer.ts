import { AnyAction } from "redux";
import { favoriteActions } from "../../utils/enums";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case favoriteActions.GET_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

export default favoriteReducer;
