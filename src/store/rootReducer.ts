import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import transactionsReducers from "./transactions/reducer";
import dashboardReducers from "./dashboard/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducers,
  dashboard: dashboardReducers,
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
