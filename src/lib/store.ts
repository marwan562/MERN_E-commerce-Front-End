import { combineReducers, configureStore } from "@reduxjs/toolkit";
import washlistSlice from "@/toolkit/Washlist/washlistSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "@/toolkit/Cart/cartSlice";
import authSlice from "@/toolkit/auth/authSlice";
import mailsSlice from "@/toolkit/Mails/mailSlice";
import networkSlice from "@/toolkit/Network/networkSlice";
import { useDispatch, useSelector } from "react-redux";
import { orderApi } from "@/toolkit/Apis/OrderApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "@/toolkit/Apis/CategoryApi";
import { productApi } from "@/toolkit/Apis/ProductApi";
import { productStatApi } from "@/toolkit/Apis/ProductStatApi";
import { customersApi } from "@/toolkit/Apis/CustomersApi";

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth", "washlist"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "isAuthanticated"],
};

const CartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["cartItems"],
};
const WashlistPersistConfig = {
  key: "washlistw",
  storage,
  whiteList: ["washlist"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  cart: persistReducer(CartPersistConfig, cartSlice),
  washlist: persistReducer(WashlistPersistConfig, washlistSlice),
  mails: mailsSlice,
  network: networkSlice,
  [orderApi.reducerPath]: orderApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [productStatApi.reducerPath]: productStatApi.reducer,
  [customersApi.reducerPath]: customersApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      orderApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      productStatApi.middleware,
      customersApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

const persistor = persistStore(store);
// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { store, persistor };
