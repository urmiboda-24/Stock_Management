import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import transactionsReducers from "./transactions/reducer";
import dashboardReducers from "./dashboard/reducer";
import userProfileReducers from "./profileSetting/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducers,
  dashboard: dashboardReducers,
  profile: userProfileReducers,
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
