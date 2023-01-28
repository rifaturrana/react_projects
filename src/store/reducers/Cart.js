// export const cartReducer = (state = [], action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const product = state.find((item) => item.id === action.payload.id);
//       return product
//         ? state.map((item) => {
//             if (item.id === product.id) {
//               item.quantity += 1;
//             }
//             return item;
//           })
//         : [...state, { ...action.payload, quantity: 1 }];
//     }

//     case "REMOVE_FROM_CART": {
//       return state.filter((item) => item.id !== action.payload);
//     }

//     case "MODIFY_QUANTITY_OF_AN_ITEM": {
//       return state.map((item) => {
//         if (item.id === action.payload.id) {
//           item.quantity = action.payload.quantity;
//         }
//         return item;
//       });
//     }

//     case "CLEAR_CART": {
//       return [];
//     }

//     default: {
//       return state;
//     }
//   }
// };

import { createSlice } from "@reduxjs/toolkit";

// export const cartReducer = createReducer([], (builder) => {
//   builder
//     .addCase("ADD_TO_CART", (state, action) => {
//       const product = state.find((item) => item.id === action.payload.id);
//       product
//         ? product.quantity++
//         : state.push({ ...action.payload, quantity: 1 });
//     })
//     .addCase("REMOVE_FROM_CART", (state, action) => {
//       return state.filter((item) => item.id !== action.payload);
//     })
//     .addCase("MODIFY_QUANTITY_OF_AN_ITEM", (state, action) => {
//       const product = state.find((item) => item.id === action.payload.id);
//       product.quantity = action.payload.quantity;
//     })
//     .addCase("CLEAR_CART", (state) => {
//       return [];
//     })
//     .addDefaultCase((state) => {
//       return state;
//     });
// });
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const product = state.find((item) => item.id === action.payload.id);
      product
        ? product.quantity++
        : state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    modifyQuantityOfAnItem(state, action) {
      const product = state.find((item) => item.id === action.payload.id);
      product.quantity = action.payload.quantity;
    },
    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, modifyQuantityOfAnItem, clearCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
