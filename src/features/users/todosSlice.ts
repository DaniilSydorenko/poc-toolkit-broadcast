import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodos {
  todosData: ITodo[];
  error: string | null;
}

const initialState: ITodos = {
  todosData: [],
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosSuccessful: (state, action: PayloadAction<any>) => {
      state.todosData = action.payload;
      state.error = null;
    },
    fetchTodosFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosSuccessful,
  fetchTodosFailed,
} = todosSlice.actions;

export const selectTodos= (state: RootState) => state.todos.todosData;

export const fetchTodos = (url: string): AppThunk =>
 async dispatch => {
  try {
    const todosData: ITodo[] = await fetch(url).then(res => res.json());
    const filteredTodos = todosData.slice(0, 10);
    dispatch(fetchTodosSuccessful(filteredTodos));
  } catch (error) {
    dispatch(fetchTodosFailed(error.message));
  }
 };

export default todosSlice.reducer;
