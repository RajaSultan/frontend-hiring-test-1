import { setSessionStorage } from "@/utils/session-storage";
import type { PayloadAction } from "@reduxjs/toolkit";

type LoginAction = PayloadAction<any>;

export const loginSuccess = (state: any, action: LoginAction): void => {
  const data = action.payload;
  state.accessToken = data.access_token;
  state.refreshToken = data.refresh_token;
  state.user = data.user;
  state.isAuthenticated = true;

  setSessionStorage("accessToken", data.access_token);
  setSessionStorage("refreshToken", data.refresh_token);
};

export const authMeSuccess = (state: any, action: LoginAction): void => {
  const data = action.payload;
  state.user = data;
  state.isAuthenticated = true;
};
