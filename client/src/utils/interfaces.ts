export interface BookHome {
  id: number;
  author: string;
  name: string;
  year: number;
  image: string;
  language: string;
  description: string;
  rating: number;
}

export interface Author {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  Books_Categories: object;
}

export interface CompleteBook {
  id: number;
  author: Author;
  name: string;
  year: number;
  image: string;
  language: string;
  description: string;
  categories: ICategory[];
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBook {
  name: string;
  author: string;
  year: number;
  language: string;
  description: string;
  categories: string[];
}

// USER

export interface ICreateUser {
  email: string;
  username: string;
  password: string;
  showPass: boolean;
}

export interface ILogInUser {
  email: string;
  password: string;
  showPass: boolean;
}

export interface CompleteUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
