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

export type TResCategoriesAdmin = {
  _id: number;
  title: string;
  img: string;
  products: IProductsTypes[];
};

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
  role: "admin" | "user";
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

export type TCreateOrder = {
  userId?: number;
  cartItems: CartItem[];
  deliveryDetails: DeliveryDetails;
};

export interface IResOrder {
  userId: string;
  cartItems: CartItem[];
  deliveryDetails: DeliveryDetails;
  totalAmount: number;
  status: TStatusOrder;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type TStatusOrder =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
export interface CartItem {
  productId: number;
  quantity: number;
  img: string;
  title: string;
  _id?: string;
}

export interface DeliveryDetails {
  name: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface TResMyOrder {
  orders: IResOrder[];
  pagination: {
    totalOrders: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
}

export type TResProducts = {
  products: IProductsTypes[];
  pagination: {
    totalProducts: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
};
