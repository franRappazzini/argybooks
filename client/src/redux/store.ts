import bookReducer from "./reducers/bookReducer";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./reducers/favoriteReducer";
import otherReducer from "./reducers/otherReducer";
import userReducer from "./reducers/userReducer";

// ...

const store = configureStore({
  reducer: {
    book: bookReducer,
    user: userReducer,
    favorite: favoriteReducer,
    other: otherReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
