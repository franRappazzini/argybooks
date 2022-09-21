import { CompleteBook, CompleteUser, ILogInUser, SearchBook } from "./interfaces";
import { addToFavorite, removeToFavorite } from "../redux/actions/favoriteActions";
import { findUser, setUser } from "../redux/actions/userActions";
import { getAllBooks, getBook, setLoading } from "./../redux/actions/bookActions";
import { getAuthors, getCategories } from "../redux/actions/otherActions";
import { useAppDispatch, useAppSelector } from "./../redux/hooks";

export const BookHook = () => {
  const dispatch = useAppDispatch();
  const { books, book, loading } = useAppSelector((state) => state.book);

  const getBooks = (data?: SearchBook) => dispatch(getAllBooks(data));
  const getBookDetail = (id: string | undefined) => dispatch(getBook(id));
  const setLoader = (setter: boolean) => dispatch(setLoading(true));

  return { books, book, setLoader, getBooks, getBookDetail, loading };
};

export const OtherHook = () => {
  const dispatch = useAppDispatch();
  const { categories, authors } = useAppSelector((state) => state.other);

  const getAllCategories = () => dispatch(getCategories());
  const getAllAuthors = () => dispatch(getAuthors());

  return {
    getAllCategories,
    getAllAuthors,
    authors: authors.map((author: { name: string }) => author.name),
    categories: categories.map((cat: { name: string }) => cat.name),
  };
};

export const UserHook = () => {
  const dispatch = useAppDispatch();
  const { loggedUser } = useAppSelector((state) => state.user);

  const setLoggedUser = (user: CompleteUser) => dispatch(setUser(user));
  const findLoggedUser = (user: ILogInUser) => findUser(user); // para iniciar sesión

  return { loggedUser, setLoggedUser, findLoggedUser };
};

export const FavoriteHook = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const addToFav = (book: CompleteBook) => dispatch(addToFavorite(book));
  const removeToFav = (id: number) => dispatch(removeToFavorite(id));

  return { favorites, addToFav, removeToFav };
};
