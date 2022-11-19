import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    addToken(state, action) {
      state.token = action.payload;
    },
    removeToken(state, action) {
      state.token = "";
    },
  },
});

export const { addToken, removeToken } = AuthSlice.actions;
export default AuthSlice.reducer;
