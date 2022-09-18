import { CompleteUser, ILogInUser } from "./interfaces";
import { findUser, setUser } from "../redux/actions/userActions";
import { getAllBooks, getBook, getCategories, setLoading } from "./../redux/actions/bookActions";
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

  const searchBook = (name: string) => dispatch(getAllBooks(name));
  const setLoader = (setter: boolean) => dispatch(setLoading(setter));

  return { searchBook, setLoader, books, loading };
};

export const GetDetailBookHook = () => {
  const dispatch = useAppDispatch();
  const { book, loading } = useAppSelector((state) => state.book);

  const getBookDetail = (id: string | undefined) => dispatch(getBook(id));

  useEffect(() => {
    dispatch(setLoading(true));
  }, [dispatch]);

  return { book, getBookDetail, loading };
};

export const GetCategoriesHook = (): string[] => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return categories.map((cat: { id: number; name: string }) => cat.name);
};

// USER
export const GetLoggedUserHook = () => {
  const dispatch = useAppDispatch();
  const { loggedUser } = useAppSelector((state) => state.user);

  const lsLoggedUser = localStorage.getItem("lsLoggedUser");

  console.log(lsLoggedUser);

  useEffect(() => {
    lsLoggedUser && dispatch(setUser(JSON.parse(lsLoggedUser)));
  }, [lsLoggedUser, dispatch]);

  const setLoggedUser = (user: CompleteUser) => dispatch(setUser(user));
  const findLoggedUser = (user: ILogInUser) => findUser(user);

  return { loggedUser, setLoggedUser, findLoggedUser };
};
