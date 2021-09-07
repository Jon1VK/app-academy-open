import React from 'react';
import { useDispatch } from 'react-redux';

import { removeTodo, toggleTodoDone } from '../../slices/todosSlice';

export const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const onRemoveTodoClick = () => dispatch(removeTodo(todo.id));
  const onToggleTodoDoneClick = () => {
    dispatch(toggleTodoDone(todo.id));
  };

  return (
    <li>
      {todo.title}
      <button onClick={onRemoveTodoClick}>Remove</button>
      <button onClick={onToggleTodoDoneClick}>
        {todo.done ? 'Undo' : 'Done'}
      </button>
    </li>
  );
};
