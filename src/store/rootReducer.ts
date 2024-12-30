import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import transactionsReducers from "./transactions/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducers,
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
