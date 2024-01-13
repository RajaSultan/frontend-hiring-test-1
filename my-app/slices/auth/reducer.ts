import { authApi } from "@/services/auth/auth-api";
import { createSlice } from "@reduxjs/toolkit";
import { loginSuccess, authMeSuccess } from "./extra-reducer";

const initialState: any = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: {
    id: null,
    username: null,
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, loginSuccess);
    builder.addMatcher(authApi.endpoints.authMe.matchFulfilled, authMeSuccess);
  },
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
