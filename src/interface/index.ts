export interface IProductsTypes {
  _id: string;
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
  _id: string;
  title: string;
  img: string;
  products: IProductsTypes[];
};

export interface ICategoriesTypes {
  _id: string;
  title: string;
  img: string;
}
export interface IBlogsTypes {
  _id: string;
  title: string;
  img: string;
  createdAt: string;
  description: string;
}

export interface User {
  authId: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneMobile?: string;
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
  _id: string;
  userId: string;
  productId: IProductsTypes;
}

export type TCreateOrder = {
  userId?: string;
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
  productId: string;
  quantity: number;
  img: string;
  title: string;
  _id?:string;
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

export interface IProductStat {
  _id: string;
  productId: string;
  year: number;
  monthlyData: TDaysData[];
  dailyData: TDaysData[];
  yearlySalesTotal: number;
  yearlyTotalSold: number;
  __v: number;
}

export type TDaysData = {
  date?: Date;
  salesTotal: number;
  totalSold: number;
  _id: string;
  month?: string;
};

export type TResCustomers = {
  customers: User[];
  pagination: {
    totalPages: number;
    totalCustomers: number;
    page: number;
    pageSize: number;
  };
};

export type TReplies = {
  _id: string;
  content: string;
  user: Partial<User>;
  isRead: boolean;
  timestamp: Date;
};

export interface IMail {
  _id?:string;
  orderId: string;
  userId: User | string;
  adminId: string;
  subject: string;
  body: string;
  status: "read" | "unread";
  mailType: "orderConfirmation" | "shippingNotification" | "customerInquiry";
  image: string;
  replies?: TReplies[];
  createdAt: Date;
  updatedAt: Date;
}
