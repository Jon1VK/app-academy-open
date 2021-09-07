import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectStepsByTodoId } from '../../slices/stepsSlice';
import { removeTodo, toggleTodoDone } from '../../slices/todosSlice';
import { StepList } from '../steps/step_list';

export const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const onRemoveTodoClick = () => dispatch(removeTodo(todo.id));
  const onToggleTodoDoneClick = () => {
    dispatch(toggleTodoDone(todo.id));
  };

  const steps = useSelector(selectStepsByTodoId(todo.id));

  return (
    <details>
      <summary>
        {todo.title}
        <button onClick={onToggleTodoDoneClick}>
          {todo.done ? 'Undo' : 'Done'}
        </button>
        <button onClick={onRemoveTodoClick}>Remove</button>
      </summary>
      <p>{todo.body}</p>
      <StepList steps={steps} todoId={todo.id} />
    </details>
  );
};
