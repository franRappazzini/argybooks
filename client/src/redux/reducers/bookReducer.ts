import { AnyAction } from "redux";
import { bookActions } from "../../utils/enums";

const initialState = {
  books: [],
  book: {},
  loading: true,
  categories: [],
};

const bookReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case bookActions.GET_ALL_BOOKS:
      return { ...state, books: action.payload, loading: false };
    case bookActions.GET_BOOK:
      return { ...state, book: action.payload, loading: false };
    case bookActions.SET_LOADING:
      return { ...state, loading: action.payload };
    case bookActions.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return { ...state, loading: true };
  }
};

export default bookReducer;
