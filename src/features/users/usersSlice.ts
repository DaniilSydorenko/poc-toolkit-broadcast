import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { object } from "prop-types";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IUsersState {
  usersData: IUser[];
  error: string | null;
}

const initialState: IUsersState = {
  usersData: [],
  error: null,
};

interface IUsers {
  users: IUser[]
}

interface IUsersData {
  data: IUsers;
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersDataSuccessful: (state, action: PayloadAction<any>) => {
      state.usersData = action.payload;
      state.error = null;
    },
    fetchUsersDataFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const {
  fetchUsersDataSuccessful,
  fetchUsersDataFailed,
} = usersSlice.actions;

export const fetchUsersData = (url: string): AppThunk =>
  async dispatch => {
    try {
      const usersData: IUsersState = await fetch(url).then(res => res.json());
      dispatch(fetchUsersDataSuccessful(usersData));
    } catch (error) {
      dispatch(fetchUsersDataFailed(error.message));
    }
  };

export const fetchUsersDataFromGrqphQL = (url: string, query: string): AppThunk =>
  async dispatch => {
    try {
      const usersData: IUsersData = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }).then(res => res.json());
      dispatch(fetchUsersDataSuccessful(usersData.data.users));
    } catch (error) {
      dispatch(fetchUsersDataFailed(error.message));
    }
  };

export const selectUsers = (state: RootState) => state.users.usersData;

export default usersSlice.reducer;
