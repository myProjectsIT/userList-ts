import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";


export interface RootState {
  users: ReturnType<typeof usersReducer>;
}


const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});


export type AppDispatch = typeof store.dispatch;

export default store;