import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "adminPaymentList",
  initialState: {
    data: null,
    loading: false,
    error: null,
    filterName: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    deletePayment: (state, action) => {
      state.data = state.data.filter(
        (payment) => !action.payload.includes(payment._id)
      );
    },
  },
});

export const {
  setData,
  setLoading,
  setError,
  setFilterName,
  deletePayment,
} = PaymentSlice.actions;

export default PaymentSlice.reducer;
