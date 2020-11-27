import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import todosReducer from '../features/users/todosSlice';

const ping = store => next => action => {
  console.log('ping')
  return next(action)
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    todos: todosReducer,
  },
  middleware: [ping]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
