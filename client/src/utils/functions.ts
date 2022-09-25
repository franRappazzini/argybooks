import { ICreateBook, ICreateUser, ILogInUser } from "./interfaces";

import { arrLanguages } from "./vars";

export const bookValidations = (
  data: ICreateBook,
  image: Blob | undefined,
  file: Blob | undefined
) => {
  const { author, year, language, description, categories } = data;
  const errors = {
    author: "",
    year: "",
    language: "",
    description: "",
    categories: "",
    imageV: "",
    fileV: "",
  };

  if (!author.match(/^[a-zA-Z\s]*$/) || author.length < 3)
    errors.author = "El autor debe contener al menos 3 caracteres y solo letras.";
  if (year <= 0 || year > new Date().getFullYear())
    errors.year = "El año debe ser mayor a 0 y menor al año actual.";
  if (!arrLanguages.includes(language))
    errors.language = "El idioma debe ser una de las opciones disponibles.";
  if (!categories.length || categories.length > 4)
    errors.categories = "Debes seleccionar al menos una categoría.";
  if (description.length >= 1500)
    errors.description = "La descripción debe contener menos de 1500 caracteres.";
  if (!image) errors.imageV = "Debes seleccionar una imagen de portada para el libro.";
  if (!file) errors.fileV = "Debes seleccionar el archivo del libro.";

  return errors;
};

export const userValidations = (user: ICreateUser) => {
  const { email, password, username } = user;

  const errors = { email: "", password: "", username: "" };

  if (username.length < 3)
    errors.username = "El Nombre de usuario debe tener al menos 3 caracteres";
  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
    errors.email = "El email debe tener tal formato";
  if (password.length < 6) errors.password = "La contraseña debe contener al menos 6 caracteres";

  return errors;
};

export const userLogInValidations = (user: ILogInUser) => {
  const { email, password } = user;
  const errors = { email: "", password: "" };

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
    errors.email = "El email debe tener tal formato";
  if (!password.length) errors.password = "La contraseña es obligatoria";

  return errors;
};

export const hash = async (str: string) => {
  const utf8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");

  return hashHex;
};
