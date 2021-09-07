import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  1: {
    id: 1,
    title: 'wash car',
    body: 'with soap',
    done: false,
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true,
  },
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
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

export const selectAllTodos = (state) => Object.values(state.todos);
