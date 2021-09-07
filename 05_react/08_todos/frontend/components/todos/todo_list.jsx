import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllTodos } from '../../slices/todosSlice';
import { fetchTodos } from '../../slices/todosSlice';
import { TodoForm } from './todo_form';
import { TodoListItem } from './todo_list_item';

export const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todos = useSelector(selectAllTodos);

  const renderedTodos = todos.map((todo) => (
    <TodoListItem key={todo.id} todo={todo} />
  ));

  return (
    <div>
      <h1>Todos</h1>
      <div>{renderedTodos}</div>
      <TodoForm />
    </div>
  );
};
