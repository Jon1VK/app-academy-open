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
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const toggleTodoDone = createAsyncThunk(
  'todos/toggleTodoDone',
  async (todo) => await APIUtil.toggleTodoDone(todo)
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todo) => await APIUtil.deleteTodo(todo)
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const todos = action.payload;
        return Object.fromEntries(todos.map((todo) => [todo.id, todo]));
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state[todo.id] = todo;
      })
      .addCase(toggleTodoDone.fulfilled, (state, action) => {
        const todo = action.payload;
        state[todo.id] = todo;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        delete state[todo.id];
      });
  },
});

export default todosSlice.reducer;

export const selectAllTodos = (state) => Object.values(state.todos);
