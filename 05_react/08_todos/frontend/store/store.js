import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todosSlice';
import stepsReducer from '../slices/stepsSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    steps: stepsReducer,
  },
});

export default store;
