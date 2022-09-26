import { Dispatch } from "redux";
import { SearchBook } from "../../utils/interfaces";
import axios from "axios";
import { bookActions } from "../../utils/enums";

const URL = "/book";

export const getAllBooks = (data?: SearchBook) => {
  return async (dispatch: Dispatch) => {
    // completo la query
    let url = URL + `?`;
    if (data?.search && data?.search !== "") url += `name=${data?.search}&`;
    if (data?.category && data?.category !== "") url += `category=${data?.category}&`;
    if (data?.author && data?.author !== "") url += `author=${data?.author}&`;
    if (data?.language && data?.language !== "") url += `language=${data?.language}&`;

    try {
      const { data } = await axios.get(url);
      dispatch({ type: bookActions.GET_ALL_BOOKS, payload: data });
    } catch (err) {
      throw err;
    }
  };
};

export const getBook = (id: string | undefined) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(URL + `/${id}`);
      dispatch({ type: bookActions.GET_BOOK, payload: data });
    } catch (err) {
      throw err;
    }
  };
};

export const getTopBooks = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(URL + "/top");
      dispatch({ type: bookActions.GET_TOP_BOOKS, payload: data });
    } catch (err) {
      throw err;
    }
  };
};

export const setLoading = (setter: boolean) => {
  return (dispatch: Dispatch) => dispatch({ type: bookActions.SET_LOADING, payload: setter });
};

export const createBook = async (data: object) => {
  try {
    const res = await axios.post(URL, { ...data });
    return res;
  } catch (err) {
    throw err;
  }
};

export const uploadBook = async (file: unknown) => {
  try {
    await axios.post("/aws/upload", file);
  } catch (err) {
    throw err;
  }
};

export const downloadBook = async (name: string) => {
  try {
    const { data } = await axios.get(`/aws/download?name=${name}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const uploadBookCover = async (image: FormData) => {
  try {
    return await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/upload`,
      image
    );
  } catch (err) {
    throw err;
  }
};
