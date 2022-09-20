import axios from "axios";

const URL = "http://localhost:3001/favorite";

export const addToFavorite = async (bookId: number, userId: number) => {
  try {
    await axios.post(URL, { bookId, userId });
  } catch (err) {
    throw err;
  }
};
