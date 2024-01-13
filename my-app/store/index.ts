import type { TypedUseSelectorHook } from "react-redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import type { AnyAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authReducer } from "@/slices/auth/reducer";
import { baseApi } from "@/services/base-api";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "@/utils/local-storage";
import { clearSessionStorage } from "@/utils/session-storage";
import { enableDevTools } from "@/config";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["auth"],
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const rootReducer = (state: any, action: any): any => {
  // Clear all data in redux store to initial.
  if (action.type === "auth/logout") {
    state = undefined;

    const rememberMeData = getLocalStorage("rememberMe");

    clearLocalStorage();
    clearSessionStorage();

    if (rememberMeData) {
      setLocalStorage("rememberMe", rememberMeData);
    }
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: enableDevTools as unknown as boolean,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = (): any => useReduxDispatch<AppDispatch>();
