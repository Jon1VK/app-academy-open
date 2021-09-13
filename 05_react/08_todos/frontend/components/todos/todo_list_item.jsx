import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectStepsByTodoId } from '../../slices/stepsSlice';
import { deleteTodo, toggleTodoDone } from '../../slices/todosSlice';
import { StepList } from '../steps/step_list';

export const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const onDeleteTodoClick = () => dispatch(deleteTodo(todo));
  const onToggleTodoDoneClick = () => {
    dispatch(toggleTodoDone(todo));
  };

  const steps = useSelector(selectStepsByTodoId(todo.id));

  return (
    <details>
      <summary>
        {todo.title}
        <button onClick={onToggleTodoDoneClick}>
          {todo.done ? 'Undo' : 'Done'}
        </button>
        <button onClick={onDeleteTodoClick}>Delete</button>
      </summary>
      <p>Tags</p>
      <ul>
        {todo.tags.map((tag) => (
          <li key={tag.name}>{tag.name}</li>
        ))}
      </ul>
      <p>{todo.body}</p>
      <StepList steps={steps} todoId={todo.id} />
    </details>
  );
};
