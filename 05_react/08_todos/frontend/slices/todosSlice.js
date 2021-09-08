import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as APIUtil from '../util/todo_api_util';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => await APIUtil.fetchTodos()
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo, { rejectWithValue }) => {
    try {
      return await APIUtil.createTodo(todo);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {},
  reducers: {
    removeTodo(state, action) {
      const todoId = action.payload;
      delete state[todoId];
    },

    toggleTodoDone(state, action) {
      const todoId = action.payload;
      const done = state[todoId].done;
      state[todoId].done = !done;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const todos = action.payload;
        return Object.fromEntries(todos.map((todo) => [todo.id, todo]));
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state[todo.id] = todo;
      });
  },
});

export const { removeTodo, toggleTodoDone } = todosSlice.actions;

export default todosSlice.reducer;

export const selectAllTodos = (state) => Object.values(state.todos);
