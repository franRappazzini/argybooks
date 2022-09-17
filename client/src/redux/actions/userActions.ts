import { ICreateUser } from "./../../utils/interfaces";
import axios from "axios";

export const createUser = async (user: ICreateUser) => {
  try {
    await axios.post("http://localhost:3001/user", user);
  } catch (err) {
    throw err;
  }
};
