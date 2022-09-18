import { AnyAction } from "redux";
import { otherActions } from "../../utils/enums";

const initialState = {
  categories: [],
  authors: [],
};

const otherReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case otherActions.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case otherActions.GET_AUTHORS:
      return { ...state, authors: action.payload };
    default:
      return state;
  }
};

export default otherReducer;
