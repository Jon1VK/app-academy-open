import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todosSlice';
import stepsReducer from '../slices/stepsSlice';
import errorsReducer from '../slices/errorsSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    steps: stepsReducer,
    errors: errorsReducer,
  },
});

export default store;
