import React from 'react';
import { useSelector } from 'react-redux';

import { selectAllTodos } from '../../slices/todosSlice';
import { TodoForm } from './todo_form';
import { TodoListItem } from './todo_list_item';

export const TodoList = () => {
  const todos = useSelector(selectAllTodos);

  const renderedTodos = todos.map((todo) => (
    <TodoListItem key={todo.id} todo={todo} />
  ));

  return (
    <div>
      <ul>{renderedTodos}</ul>
      <TodoForm />
    </div>
  );
};
