import { configureStore } from "@reduxjs/toolkit";

import authorReducer from "../store/autho-slice/index.js";
import productReducer from "../store/Products/index.js";
import shopProductSlice from "../store/shopProducts/product-slice.js";
import reviewSlice from "../store/shopProducts/review.js";
import cartSlice from "../store/shopProducts/cart.js";
import addressSlice from "../store/shopProducts/address.js";
import shopOrderSlice from "../store/order-slice/index.js";
import addressReducer from "../store/order-slice/addressSlice.js";
import featchOrderSlice from "../store/order-slice/featchOrderSlice.js";
export const store = configureStore({
  reducer: {
    auth: authorReducer,
    product: productReducer,
    shopProduct: shopProductSlice,
    review: reviewSlice,
    cart: cartSlice,
    address: addressSlice,
    selectedAddress: addressReducer,
    shopOrder: shopOrderSlice,
    featchOrder: featchOrderSlice,
  },
});

export default store;
