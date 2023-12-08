import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
  price: 350.0,
};

const movieSlice = createSlice({
  name: "calc",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload;
      state.price = state.quantity * 350;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    incrementQuantity: (state) => {
      if (state.quantity < 10) {
        state.quantity += 1;
      }

      state.price = state.quantity * 350;
    },
    decrementQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1;
        state.price = state.quantity * 350;
      }
    },
  },
});

export const { setQuantity, setPrice, incrementQuantity, decrementQuantity } =
  movieSlice.actions;

export default movieSlice.reducer;
