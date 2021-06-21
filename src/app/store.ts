import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import todosReducer from '../features/users/todosSlice';

const loggerMiddleware = store => next => action => {
  console.log("STATE BEFORE", store.getState());
  console.log("ACTION DISPATCHED", action);
  next(action);
  console.log("STATE AFTER", store.getState());
};

const config = {
  // TOGGLE_TODO will not be triggered in other tabs
  blacklist: ['TOGGLE_TODO'],
};
const middlewares = [loggerMiddleware, createStateSyncMiddleware(config)];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

initStateWithPrevTab(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
