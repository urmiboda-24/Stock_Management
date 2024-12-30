import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { IAuthState } from "./auth/reducer";
import { ITransactionInitialState } from "../utils/interface/transactions";
export interface IRootState {
  auth: IAuthState;
  transactions: ITransactionInitialState;
}
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "main-root",
  storage,
  blacklist: [],
};

const persistedReducer: any = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) => {
    const middlewares = getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware);
    return middlewares;
  },
});

sagaMiddleware.run(rootSaga);

export default store;

export const persistor = persistStore(store);
