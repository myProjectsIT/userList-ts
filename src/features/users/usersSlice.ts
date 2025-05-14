import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../../types/User';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<{ id: string; updates: Partial<User> }>) => {
      const { id, updates } = action.payload;
      state.users = state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      );
    },
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;

export const selectUsers = (state: { users: UsersState }) => state.users.users;

export default usersSlice.reducer;
