import { ICreateBook } from "./interfaces";
import { arrLanguages } from "./vars";

// TODO agregar categorias
export const bookValidations = (
  data: ICreateBook,
  image: Blob | undefined,
  file: Blob | undefined
) => {
  const { author, year, language, description, categories } = data;

  if (!author.match(/^[a-zA-Z\s]*$/) || author.length < 3)
    return "El autor debe contener al menos 3 caracteres y solo letras";
  if (year <= 0) return "El año debe ser mayor a 0";
  if (!arrLanguages.includes(language)) return "El idioma debe ser una de las opciones disponibles";
  if (!categories.length) return "Debes seleccionar al menos una categoria";
  if (description.length >= 1500) return "La descripción debe contener menos de 1500 caracteres";
  if (!image) return "Debes seleccionar una imagen de portada para el libro";
  if (!file) return "Debes seleccionar el archivo del libro";
};
