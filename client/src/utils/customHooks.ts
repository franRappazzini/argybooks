import { CompleteUser, ILogInUser, SearchBook } from "./interfaces";
import { findUser, setUser } from "../redux/actions/userActions";
import { getAllBooks, getBook, setLoading } from "./../redux/actions/bookActions";
import { getAuthors, getCategories } from "../redux/actions/otherActions";
import { useAppDispatch, useAppSelector } from "./../redux/hooks";

import { useEffect } from "react";

// BOOK
export const GetBooksHook = () => {
  const dispatch = useAppDispatch();
  const { books, loading } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllBooks());
  }, [dispatch]);

  return { books, loading };
};

export const SearchBooksHook = () => {
  const dispatch = useAppDispatch();
  const { books, loading } = useAppSelector((state) => state.book);

  const searchBook = (data: SearchBook) => dispatch(getAllBooks(data));
  const setLoader = (setter: boolean) => dispatch(setLoading(setter));

  return { searchBook, setLoader, books, loading };
};

export const GetDetailBookHook = () => {
  const dispatch = useAppDispatch();
  const { book, loading } = useAppSelector((state) => state.book);

  const getBookDetail = (id: string | undefined) => dispatch(getBook(id));
  // const setLoader = (setter: boolean) => dispatch(setLoading(setter));

  useEffect(() => {
    dispatch(setLoading(true));
  }, [dispatch]);

  return { book, getBookDetail, loading };
};

export const GetOthersHook = (): { categories: string[]; authors: string[] } => {
  const dispatch = useAppDispatch();
  const { categories, authors } = useAppSelector((state) => state.other);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, [dispatch]);

  return {
    authors: authors.map((author: { id: number; name: string }) => author.name),
    categories: categories.map((cat: { id: number; name: string }) => cat.name),
  };
};

// USER
export const GetLoggedUserHook = () => {
  const dispatch = useAppDispatch();
  const { loggedUser } = useAppSelector((state) => state.user);

  const lsLoggedUser = localStorage.getItem("lsLoggedUser");

  useEffect(() => {
    lsLoggedUser && dispatch(setUser(JSON.parse(lsLoggedUser)));
  }, [lsLoggedUser, dispatch]);

  const setLoggedUser = (user: CompleteUser) => dispatch(setUser(user));
  const findLoggedUser = (user: ILogInUser) => findUser(user); // para iniciar sesión

  return { loggedUser, setLoggedUser, findLoggedUser };
};
