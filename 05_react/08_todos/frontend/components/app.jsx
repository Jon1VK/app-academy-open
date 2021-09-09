import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { TodoList } from './todos/todo_list';
import { fetchSteps } from '../slices/stepsSlice';
import { fetchTodos } from '../slices/todosSlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchSteps());
  }, [dispatch]);

  return <TodoList />;
};
