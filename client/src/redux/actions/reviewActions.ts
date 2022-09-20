import { ICreateReview } from "./../../utils/interfaces";
import axios from "axios";

const URL = "http://localhost:3001/review";

export const createReview = async (review: ICreateReview) => {
  try {
    await axios.post(URL, review);
  } catch (err) {
    throw err;
  }
};
