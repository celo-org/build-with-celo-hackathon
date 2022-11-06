import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { config } from "./config";
import { accountReducer } from "../features/account";

export function createStore() {
  return configureStore({
    reducer: {
      account: accountReducer,
    },
    devTools: config.debug,
  });
}

export const store = createStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
