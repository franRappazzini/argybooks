import { Dispatch } from "redux";
import axios from "axios";
import { bookActions } from "../../utils/enums";

const URL = "http://localhost:3001/book";

export const getAllBooks = (name?: string) => {
  return async (dispatch: Dispatch) => {
    let url = URL;
    if (name) url += `?name=${name}`;

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
    await axios.post("http://localhost:3001/aws/upload", file);
  } catch (err) {
    throw err;
  }
};

export const downloadBook = async (name: string) => {
  try {
    await axios.get(`http://localhost:3001/aws/download?name=${name}`);
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

export const getCategories = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/category");
      dispatch({ type: bookActions.GET_CATEGORIES, payload: data });
    } catch (err) {
      throw err;
    }
  };
};
