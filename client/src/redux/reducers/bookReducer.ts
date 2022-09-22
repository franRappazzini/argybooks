import { AnyAction } from "redux";
import { bookActions } from "../../utils/enums";

const initialState = {
  books: [],
  book: {},
  loading: false,
};

const bookReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case bookActions.GET_ALL_BOOKS:
      return { ...state, books: action.payload, loading: false };
    case bookActions.GET_BOOK:
      return { ...state, book: action.payload, loading: false };
    case bookActions.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default bookReducer;
