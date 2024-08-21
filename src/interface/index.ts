export interface IProductsTypes {
  _id: number;
  title: string;
  price: number;
  category: ICategoriesTypes;
  img: string;
  stock: number;
  role: "Sale" | "New" | "";
  quantity?: number;
  inWashlist?: boolean;
}
export interface ICategoriesTypes {
  _id: number;
  title: string;
  img: string;
}
export interface IBlogsTypes {
  _id: number;
  title: string;
  img: string;
  createdAt: string;
  description: string;
}

export interface User {
  authId: string;
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneMobile?: number;
  imageUrl: string;
  role: "admin" | "user" | "superAdmin";
  createdAt: Date;
  updatedAt: Date;
}

export interface TCartItems {
  _id: string;
  userId: string;
  sessionId: string;
  productId: IProductsTypes;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TWashlist {
  _id: number;
  userId: number;
  productId: IProductsTypes;
}
