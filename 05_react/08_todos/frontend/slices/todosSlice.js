import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {},
  reducers: {
    receiveTodos: (state, action) => {
      const todos = action.payload;
      return Object.fromEntries(todos.map((todo) => [todo.id, todo]));
    },

    receiveTodo: (state, action) => {
      const todo = action.payload;
      state[todo.id] = todo;
    },

    removeTodo: (state, action) => {
      const todo = action.payload;
      delete state[todo.id];
    },
  },
});

export const { receiveTodos, receiveTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
